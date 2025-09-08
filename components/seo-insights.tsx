"use client"

import { useState } from "react"
import { 
  Search, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  Eye,
  MousePointer,
  Target,
  Link,
  FileText,
  Image,
  Globe,
  Zap,
  Shield,
  Calendar,
  Star,
  Filter,
  Award,
  Clock,
  ShieldCheck,
  ShieldX,
  Info
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer } from "recharts"

interface SEOInsightsProps {
  data: any
  dateRange: string
  apiError?: string
}

export function SEOInsights({ data, dateRange, apiError }: SEOInsightsProps) {
  const [selectedTab, setSelectedTab] = useState("overview")

  // Error state component
  const ErrorState = ({ title, message }: { title: string, message: string }) => (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-sand-beige-200 text-center">
      <div className="flex flex-col items-center">
        <div className="p-4 bg-red-100 rounded-full mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-navy-900 mb-2">{title}</h3>
        <p className="text-gray-600 max-w-md">{message}</p>
      </div>
    </div>
  )

  // Check if we have real data
  const hasData = data && !apiError

  // If no data is available, show error state
  if (!hasData) {
    return (
      <div className="space-y-6">
        <ErrorState 
          title="SEO Insights Data Unavailable"
          message={apiError || "We're currently unable to retrieve SEO insights data. This could be due to API connectivity issues, missing data sources, or service unavailability."}
        />
      </div>
    )
  }

  // Use real data from API
  const keywordRankings = data.keywordRankings || []
  const seoIssues = data.seoIssues || []
  const contentOpportunities = data.contentOpportunities || []
  const backlinkData = data.backlinkData || []
  const rankingHistory = data.rankingHistory || []
  const pagePerformance = data.pagePerformance || []

  const tabs = [
    { id: "overview", label: "Overview", icon: Search },
    { id: "keywords", label: "Keywords", icon: Target },
    { id: "issues", label: "Issues", icon: AlertTriangle },
    { id: "opportunities", label: "Opportunities", icon: TrendingUp },
    { id: "backlinks", label: "Backlinks", icon: Link },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-100"
      case "medium": return "text-yellow-600 bg-yellow-100"
      case "low": return "text-green-600 bg-green-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case "high": return "text-green-600 bg-green-100"
      case "medium": return "text-yellow-600 bg-yellow-100"
      case "low": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  // Helper functions for backlink data
  const getSpamScoreColor = (spamScore: number) => {
    if (spamScore <= 2) return "text-green-600 bg-green-100"
    if (spamScore <= 5) return "text-yellow-600 bg-yellow-100"
    if (spamScore <= 10) return "text-orange-600 bg-orange-100"
    return "text-red-600 bg-red-100"
  }

  const getSpamScoreIcon = (spamScore: number) => {
    if (spamScore <= 2) return <ShieldCheck className="h-4 w-4" />
    if (spamScore <= 5) return <Shield className="h-4 w-4" />
    if (spamScore <= 10) return <AlertTriangle className="h-4 w-4" />
    return <ShieldX className="h-4 w-4" />
  }

  const getLinkTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'editorial': return "text-blue-600 bg-blue-100"
      case 'guest post': return "text-purple-600 bg-purple-100"
      case 'sponsored': return "text-orange-600 bg-orange-100"
      case 'directory': return "text-gray-600 bg-gray-100"
      case 'news/media': return "text-red-600 bg-red-100"
      case 'forum': return "text-green-600 bg-green-100"
      case 'nofollow': return "text-yellow-600 bg-yellow-100"
      case 'brand mention': return "text-indigo-600 bg-indigo-100"
      case 'backlink service': return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getAuthorityColor = (rating: number) => {
    if (rating >= 70) return "text-green-600"
    if (rating >= 50) return "text-yellow-600"
    if (rating >= 30) return "text-orange-600"
    return "text-red-600"
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="space-y-6">
      {/* SEO Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Position</p>
              <p className="text-3xl font-bold text-navy-900">
                {data && data.avgPosition ? data.avgPosition.toFixed(1) : '--'}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  {data && data.positionGrowth ? `+${data.positionGrowth}%` : '+0%'}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-turquoise-100 rounded-lg">
              <Target className="h-6 w-6 text-turquoise-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Keywords</p>
              <p className="text-3xl font-bold text-navy-900">
                {data && data.totalKeywords ? data.totalKeywords : '--'}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  {data && data.keywordGrowth ? `+${data.keywordGrowth}%` : '+0%'}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-coral-orange-100 rounded-lg">
              <Search className="h-6 w-6 text-coral-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Organic Traffic</p>
              <p className="text-3xl font-bold text-navy-900">
                {data && data.organicTraffic ? data.organicTraffic.toLocaleString() : '--'}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  {data && data.trafficGrowth ? `+${data.trafficGrowth}%` : '+0%'}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-gold-100 rounded-lg">
              <Eye className="h-6 w-6 text-gold-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Backlink Domains</p>
              <p className="text-3xl font-bold text-navy-900">
                {backlinkData.length}
              </p>
              <div className="flex items-center mt-2">
                <Link className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  {backlinkData.reduce((sum, link) => sum + (link.links || 1), 0)} total links
                </span>
              </div>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Link className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <div className="border-b border-sand-beige-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? 'border-turquoise-500 text-turquoise-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {selectedTab === "overview" && (
          <div className="space-y-6">
            {/* Ranking History Chart */}
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Ranking History</h3>
              <div className="h-80 overflow-hidden">
                <ChartContainer
                  config={{
                    avgPosition: {
                      label: "Average Position",
                      color: "hsl(var(--color-turquoise))",
                    },
                    traffic: {
                      label: "Traffic",
                      color: "hsl(var(--color-coral-orange))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={rankingHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="avgPosition"
                        stroke="var(--color-turquoise)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-turquoise)", strokeWidth: 2, r: 4 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="traffic"
                        stroke="var(--color-coral-orange)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-coral-orange)", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>

            {/* Top Performing Pages */}
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Top Performing Pages</h3>
              <div className="space-y-3">
                {pagePerformance.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-sand-beige-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-navy-900">{page.page}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>Position: #{page.position}</span>
                        <span>{page.traffic} traffic</span>
                        <span>{page.impressions} impressions</span>
                        <span>{page.ctr}% CTR</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-turquoise-600">#{index + 1}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === "keywords" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-navy-900">Keyword Rankings</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-sand-beige-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Keyword</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Position</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Change</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Traffic</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordRankings.map((keyword, index) => (
                    <tr key={index} className="border-b border-sand-beige-100">
                      <td className="py-3 px-4 font-medium text-navy-900">{keyword.keyword}</td>
                      <td className="py-3 px-4 text-gray-700">#{keyword.position}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {keyword.change > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                          ) : keyword.change < 0 ? (
                            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                          ) : null}
                          <span className={keyword.change > 0 ? 'text-green-600' : keyword.change < 0 ? 'text-red-600' : 'text-gray-600'}>
                            {keyword.change > 0 ? `+${keyword.change}` : keyword.change}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700">{keyword.traffic.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-700">{keyword.difficulty}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedTab === "issues" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-navy-900">SEO Issues</h3>
            <div className="space-y-4">
              {seoIssues.map((issue, index) => (
                <div key={index} className="p-4 bg-sand-beige-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                        {issue.severity.toUpperCase()}
                      </span>
                      <h4 className="font-medium text-navy-900">{issue.type}</h4>
                      <span className="text-sm text-gray-600">({issue.count} pages)</span>
                    </div>
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{issue.impact}</p>
                  <div className="text-sm">
                    <p className="font-medium text-gray-700 mb-1">Affected pages:</p>
                    <div className="flex flex-wrap gap-2">
                      {issue.pages.map((page, pageIndex) => (
                        <span key={pageIndex} className="px-2 py-1 bg-white rounded text-xs text-gray-600">
                          {page}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "opportunities" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-navy-900">Content Opportunities</h3>
            <div className="space-y-4">
              {contentOpportunities.map((opportunity, index) => (
                <div key={index} className="p-4 bg-sand-beige-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOpportunityColor(opportunity.opportunity)}`}>
                        {opportunity.opportunity.toUpperCase()}
                      </span>
                      <h4 className="font-medium text-navy-900">{opportunity.keyword}</h4>
                    </div>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Search Volume</p>
                      <p className="font-medium text-navy-900">{opportunity.searchVolume.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Difficulty</p>
                      <p className="font-medium text-navy-900">{opportunity.difficulty}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Opportunity</p>
                      <p className="font-medium text-navy-900 capitalize">{opportunity.opportunity}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Suggestion:</span> {opportunity.suggestion}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "backlinks" && (
          <div className="space-y-6">
            {/* Backlink Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-sand-beige-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Domains</p>
                    <p className="text-2xl font-bold text-navy-900">{backlinkData.length}</p>
                  </div>
                  <Globe className="h-8 w-8 text-turquoise-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-sand-beige-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Links</p>
                    <p className="text-2xl font-bold text-navy-900">
                      {backlinkData.reduce((sum, link) => sum + (link.links || 1), 0)}
                    </p>
                  </div>
                  <Link className="h-8 w-8 text-coral-orange-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-sand-beige-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg. Domain Rating</p>
                    <p className="text-2xl font-bold text-navy-900">
                      {backlinkData.length > 0 
                        ? Math.round(backlinkData.reduce((sum, link) => sum + (link.domainRating || 0), 0) / backlinkData.length)
                        : 0
                      }
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-gold-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-sand-beige-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Quality Score</p>
                    <p className="text-2xl font-bold text-navy-900">
                      {backlinkData.length > 0 
                        ? Math.round(backlinkData.filter(link => (link.spamScore || 0) <= 5).length / backlinkData.length * 100)
                        : 0
                      }%
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Backlink Details */}
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Backlink Analysis</h3>
              {backlinkData.length > 0 ? (
                <div className="space-y-4">
                  {backlinkData.map((backlink, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 border border-sand-beige-200 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-semibold text-navy-900">{backlink.domain}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLinkTypeColor(backlink.type)}`}>
                              {backlink.type}
                            </span>
                            {backlink.isNofollow && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Nofollow
                              </span>
                            )}
                          </div>
                          {backlink.title && (
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{backlink.title}</p>
                          )}
                          {backlink.anchorText && (
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Anchor:</span> "{backlink.anchorText}"
                            </p>
                          )}
                        </div>
                        <a 
                          href={backlink.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-turquoise-600 hover:text-turquoise-700 p-2"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Domain Rating</p>
                          <p className={`text-xl font-bold ${getAuthorityColor(backlink.domainRating || 0)}`}>
                            {backlink.domainRating || 0}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Page Rating</p>
                          <p className={`text-xl font-bold ${getAuthorityColor(backlink.pageRating || 0)}`}>
                            {backlink.pageRating || 0}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Links</p>
                          <p className="text-xl font-bold text-navy-900">{backlink.links || 1}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">Spam Score</p>
                          <div className="flex items-center justify-center space-x-1">
                            {getSpamScoreIcon(backlink.spamScore || 0)}
                            <span className={`text-xl font-bold ${getSpamScoreColor(backlink.spamScore || 0).split(' ')[0]}`}>
                              {backlink.spamScore || 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">First seen:</span>
                          <span className="font-medium">{formatDate(backlink.dateFirstSeen)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Last seen:</span>
                          <span className="font-medium">{formatDate(backlink.dateLastSeen)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Last crawled:</span>
                          <span className="font-medium">{formatDate(backlink.lastCrawled)}</span>
                        </div>
                      </div>

                      {(backlink.linkPropensity || backlink.pagesToDomain || backlink.rootDomainsToDomain) && (
                        <div className="mt-4 pt-4 border-t border-sand-beige-200">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            {backlink.linkPropensity && (
                              <div>
                                <p className="text-gray-600">Link Propensity</p>
                                <p className="font-medium text-navy-900">{backlink.linkPropensity.toFixed(1)}</p>
                              </div>
                            )}
                            {backlink.pagesToDomain && (
                              <div>
                                <p className="text-gray-600">Pages to Domain</p>
                                <p className="font-medium text-navy-900">{backlink.pagesToDomain.toLocaleString()}</p>
                              </div>
                            )}
                            {backlink.rootDomainsToDomain && (
                              <div>
                                <p className="text-gray-600">Root Domains</p>
                                <p className="font-medium text-navy-900">{backlink.rootDomainsToDomain.toLocaleString()}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Link className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Backlink Data Available</h3>
                  <p className="text-gray-600">
                    {apiError 
                      ? "Unable to fetch backlink data due to API limitations or quota issues."
                      : "Backlink data is not available at this time."
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
