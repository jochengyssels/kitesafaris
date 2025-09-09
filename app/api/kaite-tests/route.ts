import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0]
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '10')

    const resultsPath = path.join(process.cwd(), 'test-results')
    
    // Get all test result files
    const files = fs.readdirSync(resultsPath)
      .filter(file => file.startsWith('test-results-') && file.endsWith('.json'))
      .sort()
      .reverse()

    if (files.length === 0) {
      return NextResponse.json({
        error: 'No test results found',
        message: 'Run the test suite first to generate results'
      }, { status: 404 })
    }

    // Get specific date or latest
    let targetFile = files[0] // Latest by default
    
    if (date !== 'latest') {
      const dateFile = `test-results-${date}.json`
      if (files.includes(dateFile)) {
        targetFile = dateFile
      }
    }

    const filePath = path.join(resultsPath, targetFile)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const testData = JSON.parse(fileContent)

    // Filter by category if specified
    let results = testData.detailedResults || []
    if (category) {
      results = results.filter((result: any) => result.category === category)
    }

    // Limit results
    results = results.slice(0, limit)

    // Calculate summary statistics
    const summary = {
      ...testData.summary,
      totalResults: testData.detailedResults?.length || 0,
      filteredResults: results.length,
      date: targetFile.replace('test-results-', '').replace('.json', ''),
      categories: getCategoryStats(testData.detailedResults || [])
    }

    return NextResponse.json({
      summary,
      results,
      metadata: {
        generated: testData.summary?.timestamp,
        file: targetFile,
        filters: { date, category, limit }
      }
    })

  } catch (error) {
    console.error('Error fetching test results:', error)
    return NextResponse.json({
      error: 'Failed to fetch test results',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, questionId, question } = body

    if (action === 'run_single_test') {
      // Run a single test
      const { KAIteTestSuite } = await import('../../../lib/kaite-test-suite')
      const kitespots = await import('../../../data/kitespots.json')
      
      const testSuite = new KAIteTestSuite(kitespots.default)
      const result = await testSuite.runTest(questionId)
      
      return NextResponse.json({
        success: true,
        result
      })
    }

    if (action === 'run_all_tests') {
      // Run all tests
      const { KAIteTestSuite } = await import('../../../lib/kaite-test-suite')
      const kitespots = await import('../../../data/kitespots.json')
      
      const testSuite = new KAIteTestSuite(kitespots.default)
      const results = await testSuite.runAllTests()
      
      // Save results
      const resultsPath = path.join(process.cwd(), 'test-results')
      if (!fs.existsSync(resultsPath)) {
        fs.mkdirSync(resultsPath, { recursive: true })
      }
      
      const filename = `test-results-${new Date().toISOString().split('T')[0]}.json`
      const filepath = path.join(resultsPath, filename)
      
      const summary = {
        timestamp: new Date().toISOString(),
        totalTests: results.length,
        passedTests: results.filter(r => r.passed).length,
        passRate: (results.filter(r => r.passed).length / results.length) * 100,
        avgResponseTime: results.reduce((sum, r) => sum + r.responseTime, 0) / results.length,
        avgScore: results.reduce((sum, r) => sum + r.score, 0) / results.length,
        categoryBreakdown: getCategoryStats(results),
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
      
      fs.writeFileSync(filepath, JSON.stringify({
        summary,
        detailedResults: results
      }, null, 2))
      
      return NextResponse.json({
        success: true,
        summary,
        results: results.slice(0, 10), // Return first 10 for preview
        savedTo: filename
      })
    }

    return NextResponse.json({
      error: 'Invalid action',
      message: 'Supported actions: run_single_test, run_all_tests'
    }, { status: 400 })

  } catch (error) {
    console.error('Error running tests:', error)
    return NextResponse.json({
      error: 'Failed to run tests',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

function getCategoryStats(results: any[]) {
  const categories = [...new Set(results.map(r => r.category))]
  
  return categories.reduce((stats, category) => {
    const categoryResults = results.filter(r => r.category === category)
    const passed = categoryResults.filter(r => r.passed).length
    const total = categoryResults.length
    
    stats[category] = {
      passRate: (passed / total) * 100,
      avgScore: categoryResults.reduce((sum, r) => sum + r.score, 0) / total,
      avgResponseTime: categoryResults.reduce((sum, r) => sum + r.responseTime, 0) / total,
      total,
      passed,
      failed: total - passed
    }
    
    return stats
  }, {} as Record<string, any>)
}
