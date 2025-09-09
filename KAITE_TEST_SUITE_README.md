# kAIte Test Suite

A comprehensive automated testing system for kAIte, the Virtual Kite Expert. This test suite ensures consistent quality, performance, and reliability of kAIte's responses.

## 🎯 Overview

The test suite includes **60 canonical questions** across 6 categories, with automated evaluation of:
- **Groundedness**: Accuracy and relevance of responses
- **Tool Use**: Proper utilization of available tools
- **CTA Presence**: Inclusion of appropriate call-to-action buttons
- **Latency**: Response time performance

## 📊 Test Categories

### 1. Trip Fit (15 questions)
Tests kAIte's ability to match users with appropriate trips based on:
- Skill level (beginner, intermediate, advanced)
- Budget constraints
- Travel dates
- Group size and composition

**Example**: `"Intermediate, €2500 budget, February."`
- **Expected**: Antigua/Cape Verde recommendations, wind stats, booking CTAs
- **Acceptance**: Must include specific destinations, prices, and clear next steps

### 2. Sizing (10 questions)
Tests kAIte's gear sizing recommendations based on:
- Rider weight
- Wind conditions
- Riding style
- Experience level

**Example**: `"75kg, 18-22 knots, twin-tip."`
- **Expected**: 9-12m kite range, weight considerations, wind analysis
- **Acceptance**: Must provide specific kite sizes with reasoning

### 3. Safety (10 questions)
Tests kAIte's safety awareness and recommendations:
- Risk assessment
- Appropriate cautions
- Lesson recommendations
- Equipment safety

**Example**: `"Beginner in waves?"`
- **Expected**: Caution about wave riding, lesson recommendations, safer alternatives
- **Acceptance**: Must emphasize safety and suggest professional instruction

### 4. Compare (10 questions)
Tests kAIte's ability to compare destinations:
- Side-by-side analysis
- Trade-offs and differences
- Specific conditions
- Clear recommendations

**Example**: `"Antigua vs Dakhla in March."`
- **Expected**: Comparison table, wind conditions, pros/cons, booking options
- **Acceptance**: Must provide structured comparison with clear differences

### 5. Logistics (10 questions)
Tests kAIte's travel and logistics knowledge:
- Airline policies
- Equipment transport
- Travel requirements
- Practical advice

**Example**: `"How to bring gear on ITA Airways?"`
- **Expected**: Specific airline policy, baggage guidelines, practical tips
- **Acceptance**: Must provide accurate, actionable information

### 6. General (5 questions)
Tests kAIte's general kitesurfing knowledge:
- Sport fundamentals
- Getting started advice
- Equipment basics
- General comparisons

## 🚀 Setup and Usage

### 1. Manual Testing
```bash
# Run all tests
node scripts/run-kaite-tests.js

# Run specific test
node scripts/run-kaite-tests.js --test trip_fit_001
```

### 2. Automated Testing
```bash
# Set up nightly cron job
chmod +x scripts/setup-cron.sh
./scripts/setup-cron.sh
```

### 3. Dashboard Access
Visit `/kaite-tests` to view:
- Real-time test results
- Performance metrics
- Category breakdowns
- Failed test analysis

## 📈 Evaluation Criteria

### Scoring System (0-100 points)
- **Groundedness (25 points)**: Response accuracy and relevance
- **Tool Use (25 points)**: Proper tool utilization
- **CTA Presence (25 points)**: Appropriate call-to-action buttons
- **Latency (25 points)**: Response time performance

### Acceptance Rules
Each test has specific acceptance criteria:
- **Must Include**: Required elements in response
- **Must Not Include**: Forbidden elements
- **Response Time**: Maximum allowed latency
- **Confidence**: Minimum confidence threshold

### Pass/Fail Criteria
- **Pass**: Score ≥ 70 AND all acceptance rules met
- **Fail**: Score < 70 OR any acceptance rule violated

## 🔧 Configuration

### Test Suite Configuration
```typescript
const CONFIG = {
  testSuitePath: '../lib/kaite-test-suite.ts',
  resultsPath: '../test-results',
  logPath: '../logs',
  maxRetries: 3,
  timeout: 30000 // 30 seconds per test
}
```

### Cron Job Schedule
- **Frequency**: Daily at 2:00 AM
- **Logs**: `logs/cron.log` (success), `logs/cron-error.log` (errors)
- **Results**: `test-results/test-results-YYYY-MM-DD.json`

## 📊 Monitoring and Alerts

### Automatic Alerts
The system triggers alerts for:
- **Low Pass Rate**: < 80% (HIGH severity)
- **Slow Response**: > 2000ms average (MEDIUM severity)
- **Many Failures**: > 10 failed tests (HIGH severity)

### Dashboard Metrics
- Overall pass rate and trends
- Category-specific performance
- Response time analysis
- Failed test details
- Performance issue identification

## 🛠️ API Endpoints

### GET `/api/kaite-tests`
Retrieve test results with optional filtering:
```bash
# Get latest results
GET /api/kaite-tests

# Get specific date
GET /api/kaite-tests?date=2024-01-15

# Filter by category
GET /api/kaite-tests?category=trip_fit

# Limit results
GET /api/kaite-tests?limit=20
```

### POST `/api/kaite-tests`
Run tests programmatically:
```bash
# Run all tests
POST /api/kaite-tests
{
  "action": "run_all_tests"
}

# Run single test
POST /api/kaite-tests
{
  "action": "run_single_test",
  "questionId": "trip_fit_001"
}
```

## 📝 Adding New Tests

### 1. Define Test Question
```typescript
{
  id: 'new_test_001',
  category: 'trip_fit',
  question: 'Your test question here',
  expectedElements: ['element1', 'element2'],
  expectedCTAs: ['Book', 'Compare'],
  acceptanceRules: {
    mustInclude: ['required', 'elements'],
    mustNotInclude: ['forbidden', 'elements'],
    responseTime: 3000
  }
}
```

### 2. Add to Test Suite
```typescript
// In lib/kaite-test-suite.ts
private generateTestQuestions(): TestQuestion[] {
  return [
    // ... existing tests
    newTestQuestion
  ]
}
```

### 3. Update Documentation
Update this README with the new test details and expected behavior.

## 🔍 Troubleshooting

### Common Issues

**Tests Failing with Low Scores**
- Check if kAIte's responses include expected elements
- Verify CTA buttons are properly configured
- Review response time performance

**Cron Job Not Running**
- Check cron service status: `systemctl status cron`
- Verify cron job exists: `crontab -l`
- Check log files for errors

**Dashboard Not Loading**
- Ensure test results exist in `test-results/` directory
- Check API endpoint accessibility
- Verify file permissions

### Debug Mode
```bash
# Run with verbose logging
DEBUG=kaite-tests node scripts/run-kaite-tests.js

# Test specific category
node scripts/run-kaite-tests.js --category trip_fit
```

## 📚 Best Practices

### Test Design
- Keep questions realistic and user-focused
- Include edge cases and boundary conditions
- Test both positive and negative scenarios
- Ensure acceptance rules are specific and measurable

### Maintenance
- Review and update tests weekly
- Monitor performance trends
- Update expected elements as kAIte evolves
- Archive old test results regularly

### Performance
- Run tests during low-traffic periods
- Monitor system resources during test runs
- Set appropriate timeouts for different test types
- Use parallel execution where possible

## 🎯 Success Metrics

### Target Performance
- **Pass Rate**: ≥ 90%
- **Average Score**: ≥ 85/100
- **Response Time**: ≤ 1500ms
- **Uptime**: ≥ 99.9%

### Quality Indicators
- Consistent performance across categories
- Low variance in response times
- Minimal failed tests
- High user satisfaction scores

---

This test suite ensures kAIte maintains high quality and reliability while providing valuable insights for continuous improvement. Regular monitoring and updates keep the system aligned with user expectations and business goals.
