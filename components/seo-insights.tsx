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
  Zap
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer } from "recharts"

interface SEOInsightsProps {
  data: any
  dateRange: string
}

export function SEOInsights({ data, dateRange }: SEOInsightsProps) {
  const [selectedTab, setSelectedTab] = useState("overview")

  // Mock data for demonstration
  const keywordRankings = [
    { keyword: "kite safari antigua", position: 3, change: 2, traffic: 1200, difficulty: 45 },
    { keyword: "kiteboarding sardinia", position: 5, change: -1, traffic: 800, difficulty: 38 },
    { keyword: "kite cruise caribbean", position: 8, change: 3, traffic: 600, difficulty: 52 },
    { keyword: "kite lessons greece", position: 12, change: 0, traffic: 400, difficulty: 35 },
    { keyword: "kiteboarding croatia", position: 15, change: -2, traffic: 300, difficulty: 28 },
    { keyword: "kite safari barbados", position: 18, change: 1, traffic: 250, difficulty: 42 },
    { keyword: "kiteboarding lessons", position: 22, change: -3, traffic: 200, difficulty: 55 },
    { keyword: "kite cruise mediterranean", position: 25, change: 0, traffic: 150, difficulty: 48 },
  ]

  const seoIssues = [
    { 
      type: "Missing Meta Description", 
      count: 12, 
      severity: "medium", 
      pages: ["/destinations/greece", "/fleet", "/contact/prokite"],
      impact: "Reduces click-through rates from search results"
    },
    { 
      type: "Missing H1 Tags", 
      count: 5, 
      severity: "high", 
      pages: ["/destinations/croatia", "/premium-equipment"],
      impact: "Hinders search engine understanding of page content"
    },
    { 
      type: "Missing Alt Text", 
      count: 28, 
      severity: "low", 
      pages: ["/gallery", "/destinations/sardinia"],
      impact: "Reduces accessibility and image search visibility"
    },
    { 
      type: "Thin Content", 
      count: 3, 
      severity: "high", 
      pages: ["/privacy", "/terms"],
      impact: "May be penalized by search engines"
    },
    { 
      type: "Slow Loading Pages", 
      count: 7, 
      severity: "medium", 
      pages: ["/destinations/antigua", "/booking"],
      impact: "Negatively affects user experience and rankings"
    },
  ]

  const contentOpportunities = [
    { 
      keyword: "kiteboarding safety tips", 
      searchVolume: 2400, 
      difficulty: 35, 
      opportunity: "high",
      suggestion: "Create comprehensive safety guide for kiteboarding"
    },
    { 
      keyword: "best kiteboarding destinations europe", 
      searchVolume: 1800, 
      difficulty: 42, 
      opportunity: "medium",
      suggestion: "Compare European kiteboarding destinations"
    },
    { 
      keyword: "kiteboarding equipment guide", 
      searchVolume: 3200, 
      difficulty: 38, 
      opportunity: "high",
      suggestion: "Detailed equipment selection and maintenance guide"
    },
    { 
      keyword: "kiteboarding weather conditions", 
      searchVolume: 1600, 
      difficulty: 28, 
      opportunity: "medium",
      suggestion: "Weather patterns and wind conditions guide"
    },
    { 
      keyword: "kiteboarding for beginners", 
      searchVolume: 4500, 
      difficulty: 45, 
      opportunity: "high",
      suggestion: "Complete beginner's guide to kiteboarding"
    },
  ]

  const backlinkData = [
    { domain: "kiteboarding.com", links: 12, domainRating: 85, type: "dofollow" },
    { domain: "windsurfing.org", links: 8, domainRating: 72, type: "dofollow" },
    { domain: "travelblog.com", links: 15, domainRating: 68, type: "nofollow" },
    { domain: "sportsmagazine.net", links: 5, domainRating: 78, type: "dofollow" },
    { domain: "adventuretravel.com", links: 9, domainRating: 82, type: "dofollow" },
  ]

  const rankingHistory = [
    { date: "2024-01-01", avgPosition: 18.5, keywords: 45, traffic: 2400 },
    { date: "2024-01-08", avgPosition: 17.2, keywords: 48, traffic: 2600 },
    { date: "2024-01-15", avgPosition: 16.8, keywords: 52, traffic: 2800 },
    { date: "2024-01-22", avgPosition: 15.9, keywords: 55, traffic: 3100 },
    { date: "2024-01-29", avgPosition: 15.1, keywords: 58, traffic: 3400 },
  ]

  const pagePerformance = [
    { page: "/", position: 3, traffic: 2400, impressions: 12000, ctr: 20.0 },
    { page: "/destinations/antigua", position: 5, traffic: 1800, impressions: 8500, ctr: 21.2 },
    { page: "/booking", position: 8, traffic: 1200, impressions: 6000, ctr: 20.0 },
    { page: "/destinations/sardinia", position: 12, traffic: 900, impressions: 4500, ctr: 20.0 },
    { page: "/blog", position: 15, traffic: 750, impressions: 3500, ctr: 21.4 },
  ]

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

  return (
    <div className="space-y-6">
      {/* SEO Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Position</p>
              <p className="text-3xl font-bold text-navy-900">15.1</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2.3</span>
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
              <p className="text-3xl font-bold text-navy-900">58</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+13</span>
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
              <p className="text-3xl font-bold text-navy-900">3.4k</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+41.7%</span>
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
              <p className="text-sm font-medium text-gray-600">SEO Score</p>
              <p className="text-3xl font-bold text-navy-900">85%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+5%</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Zap className="h-6 w-6 text-emerald-600" />
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
              <div className="h-64">
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
                  <ResponsiveContainer width="100%" height="100%">
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
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-navy-900">Backlink Profile</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-sand-beige-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Domain</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Links</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Domain Rating</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {backlinkData.map((backlink, index) => (
                    <tr key={index} className="border-b border-sand-beige-100">
                      <td className="py-3 px-4 font-medium text-navy-900">{backlink.domain}</td>
                      <td className="py-3 px-4 text-gray-700">{backlink.links}</td>
                      <td className="py-3 px-4 text-gray-700">{backlink.domainRating}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          backlink.type === 'dofollow' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {backlink.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-turquoise-600 hover:text-turquoise-700">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
