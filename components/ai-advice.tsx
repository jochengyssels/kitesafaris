"use client"

import { useState } from "react"
import { Brain, Loader2, AlertCircle, CheckCircle, Lightbulb } from "lucide-react"

interface AIAdviceProps {
  dateRange: string
}

interface AIAnalysis {
  id: number
  type: 'trend' | 'performance' | 'improvement' | 'opportunity' | 'warning'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  priority: number
  actionable: boolean
  category: string
}

export function AIAdvice({ dateRange }: AIAdviceProps) {
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<AIAnalysis[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleRetrieveAdvice = async () => {
    try {
      setLoading(true)
      setError(null)
      setAnalysis(null)

      const response = await fetch('/api/analytics/ai-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRange,
          timestamp: new Date().toISOString()
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to retrieve AI advice')
      }

      if (result.success && result.analysis) {
        setAnalysis(result.analysis)
      } else {
        throw new Error('Invalid response format')
      }

    } catch (err) {
      console.error('Error retrieving AI advice:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trend':
        return '📈'
      case 'performance':
        return '⚡'
      case 'improvement':
        return '🔧'
      case 'opportunity':
        return '💡'
      case 'warning':
        return '⚠️'
      default:
        return '📊'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return 'text-red-600'
    if (priority >= 6) return 'text-orange-600'
    if (priority >= 4) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-navy-900">AI-Powered Analytics Advice</h2>
              <p className="text-gray-600 text-sm">
                Get intelligent insights and recommendations based on your analytics data
              </p>
            </div>
          </div>
          
          <button
            onClick={handleRetrieveAdvice}
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Lightbulb className="h-5 w-5" />
            )}
            <span className="font-medium">
              {loading ? 'Analyzing...' : 'Retrieve AI Advice'}
            </span>
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-red-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900">Error Retrieving AI Advice</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-sand-beige-200 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full">
              <Brain className="h-8 w-8 text-purple-600 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">AI Analysis in Progress</h3>
              <p className="text-gray-600">
                Our AI is analyzing your analytics data to provide personalized insights and recommendations...
              </p>
            </div>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysis && analysis.length > 0 && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
            <div className="flex items-center space-x-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-navy-900">
                AI Analysis Complete - {analysis.length} Insights Found
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Based on your analytics data for the {dateRange} period, here are the key insights and recommendations:
            </p>
          </div>

          <div className="grid gap-4">
            {analysis.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getTypeIcon(item.type)}</span>
                    <div>
                      <h4 className="text-lg font-semibold text-navy-900">{item.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(item.impact)}`}>
                          {item.impact.toUpperCase()} IMPACT
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500 capitalize">{item.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${getPriorityColor(item.priority)}`}>
                      Priority: {item.priority}/10
                    </div>
                    {item.actionable && (
                      <div className="text-xs text-green-600 font-medium mt-1">
                        ✓ Actionable
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="capitalize">Type: {item.type}</span>
                    <span>Analysis #{index + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Analysis State */}
      {analysis && analysis.length === 0 && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-sand-beige-200 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-gray-100 rounded-full">
              <Brain className="h-8 w-8 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">No Insights Available</h3>
              <p className="text-gray-600">
                The AI analysis didn't find any significant insights for the selected time period. 
                Try selecting a different date range or ensure you have sufficient data.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!loading && !analysis && !error && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Lightbulb className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-900 mb-2">How AI Advice Works</h3>
              <div className="text-purple-800 space-y-2">
                <p>• <strong>Data Analysis:</strong> Our AI analyzes your website analytics, SEO metrics, and business data</p>
                <p>• <strong>Pattern Recognition:</strong> Identifies trends, anomalies, and opportunities in your data</p>
                <p>• <strong>Actionable Insights:</strong> Provides specific recommendations to improve performance</p>
                <p>• <strong>Priority Ranking:</strong> Sorts insights by impact and urgency for better decision making</p>
              </div>
              <p className="text-purple-700 text-sm mt-3">
                Click "Retrieve AI Advice" to get started with your personalized analysis.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
