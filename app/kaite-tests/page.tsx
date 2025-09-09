'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  Play,
  RefreshCw
} from 'lucide-react'

interface TestResult {
  questionId: string
  question: string
  category: string
  response: string
  responseTime: number
  score: number
  maxScore: number
  details: {
    groundedness: number
    toolUse: number
    ctaPresence: number
    latency: number
    confidence: number
  }
  passed: boolean
  timestamp: string
}

interface TestSummary {
  totalTests: number
  passedTests: number
  passRate: number
  avgResponseTime: number
  avgScore: number
  totalResults: number
  filteredResults: number
  date: string
  categories: Record<string, any>
}

export default function KAIteTestsPage() {
  const [summary, setSummary] = useState<TestSummary | null>(null)
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [runningTests, setRunningTests] = useState(false)

  const fetchTestResults = async (category: string = 'all') => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams()
      if (category !== 'all') {
        params.append('category', category)
      }
      params.append('limit', '50')
      
      const response = await fetch(`/api/kaite-tests?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch test results')
      }
      
      const data = await response.json()
      setSummary(data.summary)
      setResults(data.results)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const runAllTests = async () => {
    try {
      setRunningTests(true)
      setError(null)
      
      const response = await fetch('/api/kaite-tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'run_all_tests' })
      })
      
      if (!response.ok) {
        throw new Error('Failed to run tests')
      }
      
      const data = await response.json()
      
      // Refresh the results
      await fetchTestResults(selectedCategory)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setRunningTests(false)
    }
  }

  useEffect(() => {
    fetchTestResults(selectedCategory)
  }, [selectedCategory])

  const getCategoryColor = (category: string) => {
    const colors = {
      trip_fit: 'bg-blue-100 text-blue-800',
      sizing: 'bg-green-100 text-green-800',
      safety: 'bg-red-100 text-red-800',
      compare: 'bg-purple-100 text-purple-800',
      logistics: 'bg-yellow-100 text-yellow-800',
      general: 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getResponseTimeColor = (time: number) => {
    if (time <= 1000) return 'text-green-600'
    if (time <= 2000) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading test results...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-deep-navy">kAIte Test Suite Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor kAIte's performance and quality</p>
        </div>
        <Button 
          onClick={runAllTests} 
          disabled={runningTests}
          className="bg-coral-orange hover:bg-orange-500"
        >
          {runningTests ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Running Tests...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Run All Tests
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {summary && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {summary.passRate.toFixed(1)}%
                </div>
                <p className="text-xs text-gray-600">
                  {summary.passedTests} of {summary.totalTests} tests passed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {summary.avgScore.toFixed(1)}/100
                </div>
                <p className="text-xs text-gray-600">
                  Overall test performance
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                <Clock className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {summary.avgResponseTime.toFixed(0)}ms
                </div>
                <p className="text-xs text-gray-600">
                  Average response time
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                <RefreshCw className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">
                  {summary.date}
                </div>
                <p className="text-xs text-gray-600">
                  Test results date
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(summary.categories).map(([category, stats]: [string, any]) => (
                  <div key={category} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(category)}>
                        {category.replace('_', ' ')}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {stats.passed}/{stats.total}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                      {stats.passRate.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Avg Score: {stats.avgScore.toFixed(1)}/100
                    </div>
                    <div className="text-sm text-gray-600">
                      Avg Time: {stats.avgResponseTime.toFixed(0)}ms
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Test Results */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Test Results</CardTitle>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="trip_fit">Trip Fit</TabsTrigger>
                <TabsTrigger value="sizing">Sizing</TabsTrigger>
                <TabsTrigger value="safety">Safety</TabsTrigger>
                <TabsTrigger value="compare">Compare</TabsTrigger>
                <TabsTrigger value="logistics">Logistics</TabsTrigger>
                <TabsTrigger value="general">General</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.map((result) => (
              <div key={result.questionId} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getCategoryColor(result.category)}>
                        {result.category.replace('_', ' ')}
                      </Badge>
                      <Badge variant={result.passed ? 'default' : 'destructive'}>
                        {result.passed ? (
                          <>
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Passed
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 mr-1" />
                            Failed
                          </>
                        )}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {result.question}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {result.response.substring(0, 150)}...
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className={`text-lg font-bold ${getScoreColor(result.score)}`}>
                      {result.score}/100
                    </div>
                    <div className={`text-sm ${getResponseTimeColor(result.responseTime)}`}>
                      {result.responseTime}ms
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Groundedness:</span>
                    <span className="ml-1 font-medium">{result.details.groundedness}/25</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tool Use:</span>
                    <span className="ml-1 font-medium">{result.details.toolUse}/25</span>
                  </div>
                  <div>
                    <span className="text-gray-600">CTA Presence:</span>
                    <span className="ml-1 font-medium">{result.details.ctaPresence}/25</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Latency:</span>
                    <span className="ml-1 font-medium">{result.details.latency}/25</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
