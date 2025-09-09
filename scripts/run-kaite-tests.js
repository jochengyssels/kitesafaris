#!/usr/bin/env node

/**
 * kAIte Automated Test Runner
 * 
 * This script runs the kAIte test suite and logs results to the database.
 * Designed to run nightly via cron job.
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Configuration
const CONFIG = {
  testSuitePath: path.join(__dirname, '../lib/kaite-test-suite.ts'),
  resultsPath: path.join(__dirname, '../test-results'),
  logPath: path.join(__dirname, '../logs'),
  maxRetries: 3,
  timeout: 30000 // 30 seconds per test
}

// Ensure directories exist
function ensureDirectories() {
  [CONFIG.resultsPath, CONFIG.logPath].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

// Run the test suite
async function runTestSuite() {
  console.log('🧪 Starting kAIte Test Suite...')
  
  try {
    // Compile TypeScript if needed
    console.log('📦 Compiling TypeScript...')
    execSync('npx tsc --noEmit', { cwd: path.join(__dirname, '..') })
    
    // Run the tests
    console.log('🏃 Running tests...')
    const testCommand = `
      const { KAIteTestSuite } = require('./lib/kaite-test-suite.ts')
      const kitespots = require('./data/kitespots.json')
      
      const testSuite = new KAIteTestSuite(kitespots)
      const results = await testSuite.runAllTests()
      
      console.log(JSON.stringify(results, null, 2))
    `
    
    const results = execSync(`node -e "${testCommand}"`, { 
      cwd: path.join(__dirname, '..'),
      timeout: CONFIG.timeout,
      encoding: 'utf8'
    })
    
    return JSON.parse(results)
    
  } catch (error) {
    console.error('❌ Test suite failed:', error.message)
    throw error
  }
}

// Log results to database (simulated)
async function logToDatabase(results) {
  console.log('💾 Logging results to database...')
  
  const summary = {
    timestamp: new Date().toISOString(),
    totalTests: results.length,
    passedTests: results.filter(r => r.passed).length,
    passRate: (results.filter(r => r.passed).length / results.length) * 100,
    avgResponseTime: results.reduce((sum, r) => sum + r.responseTime, 0) / results.length,
    avgScore: results.reduce((sum, r) => sum + r.score, 0) / results.length,
    categoryBreakdown: getCategoryBreakdown(results),
    failedTests: results.filter(r => !r.passed).map(r => ({
      id: r.questionId,
      category: r.category,
      score: r.score,
      responseTime: r.responseTime
    })),
    performanceIssues: results.filter(r => r.responseTime > 3000).map(r => ({
      id: r.questionId,
      responseTime: r.responseTime
    }))
  }
  
  // Save to file (in real implementation, this would go to database)
  const filename = `test-results-${new Date().toISOString().split('T')[0]}.json`
  const filepath = path.join(CONFIG.resultsPath, filename)
  
  fs.writeFileSync(filepath, JSON.stringify({
    summary,
    detailedResults: results
  }, null, 2))
  
  console.log(`📊 Results saved to ${filepath}`)
  
  // Log to console for monitoring
  console.log(`
📈 Test Summary:
- Total Tests: ${summary.totalTests}
- Passed: ${summary.passedTests}
- Pass Rate: ${summary.passRate.toFixed(1)}%
- Average Score: ${summary.avgScore.toFixed(1)}/100
- Average Response Time: ${summary.avgResponseTime.toFixed(0)}ms
- Failed Tests: ${summary.failedTests.length}
- Performance Issues: ${summary.performanceIssues.length}
  `)
  
  return summary
}

// Get category breakdown
function getCategoryBreakdown(results) {
  const categories = [...new Set(results.map(r => r.category))]
  
  return categories.reduce((breakdown, category) => {
    const categoryResults = results.filter(r => r.category === category)
    const passed = categoryResults.filter(r => r.passed).length
    const total = categoryResults.length
    
    breakdown[category] = {
      passRate: (passed / total) * 100,
      avgScore: categoryResults.reduce((sum, r) => sum + r.score, 0) / total,
      total,
      passed
    }
    
    return breakdown
  }, {})
}

// Send alerts if needed
function checkAlerts(summary) {
  const alerts = []
  
  // Check pass rate
  if (summary.passRate < 80) {
    alerts.push({
      type: 'LOW_PASS_RATE',
      message: `Pass rate is ${summary.passRate.toFixed(1)}% (below 80% threshold)`,
      severity: 'HIGH'
    })
  }
  
  // Check average response time
  if (summary.avgResponseTime > 2000) {
    alerts.push({
      type: 'SLOW_RESPONSE',
      message: `Average response time is ${summary.avgResponseTime.toFixed(0)}ms (above 2000ms threshold)`,
      severity: 'MEDIUM'
    })
  }
  
  // Check failed tests
  if (summary.failedTests.length > 10) {
    alerts.push({
      type: 'MANY_FAILURES',
      message: `${summary.failedTests.length} tests failed (above 10 threshold)`,
      severity: 'HIGH'
    })
  }
  
  if (alerts.length > 0) {
    console.log('🚨 Alerts triggered:')
    alerts.forEach(alert => {
      console.log(`  - ${alert.severity}: ${alert.message}`)
    })
    
    // In real implementation, send alerts via email/Slack/etc.
    // sendAlerts(alerts)
  }
  
  return alerts
}

// Main execution
async function main() {
  const startTime = Date.now()
  
  try {
    ensureDirectories()
    
    console.log('🚀 Starting kAIte automated test run...')
    console.log(`⏰ Started at: ${new Date().toISOString()}`)
    
    // Run tests
    const results = await runTestSuite()
    
    // Log results
    const summary = await logToDatabase(results)
    
    // Check for alerts
    const alerts = checkAlerts(summary)
    
    const duration = Date.now() - startTime
    console.log(`✅ Test run completed in ${duration}ms`)
    
    // Exit with appropriate code
    if (alerts.some(alert => alert.severity === 'HIGH')) {
      process.exit(1) // High severity alerts
    } else if (alerts.length > 0) {
      process.exit(2) // Medium severity alerts
    } else {
      process.exit(0) // All good
    }
    
  } catch (error) {
    console.error('💥 Test run failed:', error)
    
    // Log error
    const errorLog = {
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack
    }
    
    const errorFile = path.join(CONFIG.logPath, `error-${Date.now()}.json`)
    fs.writeFileSync(errorFile, JSON.stringify(errorLog, null, 2))
    
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Test run interrupted')
  process.exit(1)
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Test run terminated')
  process.exit(1)
})

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = {
  runTestSuite,
  logToDatabase,
  checkAlerts
}
