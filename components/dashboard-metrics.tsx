"use client"

import { 
  Users, 
  Eye, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Calendar,
  Search,
  AlertTriangle,
  Clock,
  MousePointer,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface DashboardMetricsProps {
  websiteMetrics: any
  businessMetrics: any
  seoInsights: any
  alerts: any[]
  apiErrors: Record<string, string>
}

export function DashboardMetrics({ websiteMetrics, businessMetrics, seoInsights, alerts, apiErrors }: DashboardMetricsProps) {
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

  // No data state component
  const NoDataState = ({ title, message }: { title: string, message: string }) => (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-sand-beige-200 text-center">
      <div className="flex flex-col items-center">
        <div className="p-4 bg-gray-100 rounded-full mb-4">
          <AlertTriangle className="h-8 w-8 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-navy-900 mb-2">{title}</h3>
        <p className="text-gray-600 max-w-md">{message}</p>
      </div>
    </div>
  )

  // Check if we have any real data
  const hasWebsiteData = websiteMetrics && !apiErrors.website
  const hasBusinessData = businessMetrics && !apiErrors.business
  const hasSeoData = seoInsights && !apiErrors.seo
  const hasAlertsData = alerts && alerts.length > 0 && !apiErrors.alerts

  // If no data is available, show error state
  if (!hasWebsiteData && !hasBusinessData && !hasSeoData && !hasAlertsData) {
    return (
      <div className="space-y-6">
        <ErrorState 
          title="No Analytics Data Available"
          message="We're currently unable to display any analytics data. This could be due to API connectivity issues, missing data sources, or service unavailability. Please check the service status or try refreshing the page."
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Website Traffic */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          {hasWebsiteData && websiteMetrics.visitors ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                <p className="text-3xl font-bold text-navy-900">
                  {websiteMetrics.visitors.toLocaleString()}
                </p>
                {websiteMetrics.visitorChange && (
                  <div className="flex items-center mt-2">
                    {websiteMetrics.visitorChange > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${websiteMetrics.visitorChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {websiteMetrics.visitorChange > 0 ? '+' : ''}{websiteMetrics.visitorChange}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                )}
              </div>
              <div className="p-3 bg-turquoise-100 rounded-lg">
                <Users className="h-6 w-6 text-turquoise-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                <p className="text-3xl font-bold text-gray-400">--</p>
                <p className="text-sm text-red-600 mt-2">No data available</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Page Views */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          {hasWebsiteData && websiteMetrics.pageViews ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-3xl font-bold text-navy-900">
                  {websiteMetrics.pageViews.toLocaleString()}
                </p>
                {websiteMetrics.pageViewChange && (
                  <div className="flex items-center mt-2">
                    {websiteMetrics.pageViewChange > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${websiteMetrics.pageViewChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {websiteMetrics.pageViewChange > 0 ? '+' : ''}{websiteMetrics.pageViewChange}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                )}
              </div>
              <div className="p-3 bg-coral-orange-100 rounded-lg">
                <Eye className="h-6 w-6 text-coral-orange-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-3xl font-bold text-gray-400">--</p>
                <p className="text-sm text-red-600 mt-2">No data available</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Eye className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          {hasBusinessData && businessMetrics.revenue ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-navy-900">
                  €{businessMetrics.revenue.toLocaleString()}
                </p>
                {businessMetrics.revenueChange && (
                  <div className="flex items-center mt-2">
                    {businessMetrics.revenueChange > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${businessMetrics.revenueChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {businessMetrics.revenueChange > 0 ? '+' : ''}{businessMetrics.revenueChange}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                )}
              </div>
              <div className="p-3 bg-gold-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-gold-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-gray-400">--</p>
                <p className="text-sm text-red-600 mt-2">No data available</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          {hasBusinessData && businessMetrics.bookings ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Bookings</p>
                <p className="text-3xl font-bold text-navy-900">
                  {businessMetrics.bookings}
                </p>
                {businessMetrics.bookingChange && (
                  <div className="flex items-center mt-2">
                    {businessMetrics.bookingChange > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${businessMetrics.bookingChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {businessMetrics.bookingChange > 0 ? '+' : ''}{businessMetrics.bookingChange}%
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last period</span>
                  </div>
                )}
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Calendar className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New Bookings</p>
                <p className="text-3xl font-bold text-gray-400">--</p>
                <p className="text-sm text-red-600 mt-2">No data available</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Traffic Trends</h3>
            {hasWebsiteData && websiteMetrics.trafficData && (
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-turquoise-500 rounded-full mr-2"></div>
                  <span>Visitors</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-coral-orange-500 rounded-full mr-2"></div>
                  <span>Page Views</span>
                </div>
              </div>
            )}
          </div>
          <div className="h-64 overflow-hidden">
            {hasWebsiteData && websiteMetrics.trafficData && websiteMetrics.trafficData.length > 0 ? (
              <ChartContainer
                config={{
                  visitors: {
                    label: "Visitors",
                    color: "hsl(var(--color-turquoise))",
                  },
                  pageViews: {
                    label: "Page Views",
                    color: "hsl(var(--color-coral-orange))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={websiteMetrics.trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="visitors"
                      stroke="var(--color-visitors)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-visitors)", strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="pageViews"
                      stroke="var(--color-pageViews)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-pageViews)", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <NoDataState 
                  title="No Traffic Data Available"
                  message="Traffic trend data is not available at this time."
                />
              </div>
            )}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Device Breakdown</h3>
            {hasWebsiteData && websiteMetrics.deviceData && (
              <div className="flex items-center space-x-2">
                <Monitor className="h-4 w-4 text-gray-500" />
                <Smartphone className="h-4 w-4 text-gray-500" />
                <Tablet className="h-4 w-4 text-gray-500" />
              </div>
            )}
          </div>
          <div className="h-64 overflow-hidden">
            {hasWebsiteData && websiteMetrics.deviceData && websiteMetrics.deviceData.length > 0 ? (
              <ChartContainer
                config={{
                  desktop: {
                    label: "Desktop",
                    color: "#0891b2",
                  },
                  mobile: {
                    label: "Mobile",
                    color: "#ea580c",
                  },
                  tablet: {
                    label: "Tablet",
                    color: "#ca8a04",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={websiteMetrics.deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {websiteMetrics.deviceData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <NoDataState 
                  title="No Device Data Available"
                  message="Device breakdown data is not available at this time."
                />
              </div>
            )}
          </div>
          {hasWebsiteData && websiteMetrics.deviceData && websiteMetrics.deviceData.length > 0 && (
            <div className="mt-4 space-y-2">
              {websiteMetrics.deviceData.map((device: any, index: number) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: device.color }}
                    ></div>
                    <span>{device.name}</span>
                  </div>
                  <span className="font-medium">{device.value}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top and Bottom Performing Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Pages */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Top Performing Pages</h3>
            {hasWebsiteData && websiteMetrics.topPages && websiteMetrics.topPages.length > 0 && (
              <TrendingUp className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div className="space-y-4">
            {hasWebsiteData && websiteMetrics.topPages && websiteMetrics.topPages.length > 0 ? (
              websiteMetrics.topPages.map((page: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-navy-900">{page.page}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{page.visitors.toLocaleString()} visitors</span>
                      <span>{page.bounceRate}% bounce</span>
                      <span>{page.avgTime} avg time</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">#{index + 1}</div>
                  </div>
                </div>
              ))
            ) : (
              <NoDataState 
                title="No Page Performance Data"
                message="Top performing pages data is not available at this time."
              />
            )}
          </div>
        </div>

        {/* Bottom Performing Pages */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Pages Needing Attention</h3>
            {hasWebsiteData && websiteMetrics.bottomPages && websiteMetrics.bottomPages.length > 0 && (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="space-y-4">
            {hasWebsiteData && websiteMetrics.bottomPages && websiteMetrics.bottomPages.length > 0 ? (
              websiteMetrics.bottomPages.map((page: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-navy-900">{page.page}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>{page.visitors.toLocaleString()} visitors</span>
                      <span>{page.bounceRate}% bounce</span>
                      <span>{page.avgTime} avg time</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">#{index + 1}</div>
                  </div>
                </div>
              ))
            ) : (
              <NoDataState 
                title="No Page Performance Data"
                message="Pages needing attention data is not available at this time."
              />
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Session Duration</p>
              {hasWebsiteData && websiteMetrics.avgSessionDuration ? (
                <p className="text-2xl font-bold text-navy-900">{websiteMetrics.avgSessionDuration}</p>
              ) : (
                <p className="text-2xl font-bold text-gray-400">--</p>
              )}
            </div>
            <Clock className={`h-8 w-8 ${hasWebsiteData && websiteMetrics.avgSessionDuration ? 'text-turquoise-600' : 'text-gray-400'}`} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
              {hasWebsiteData && websiteMetrics.bounceRate ? (
                <p className="text-2xl font-bold text-navy-900">{websiteMetrics.bounceRate}%</p>
              ) : (
                <p className="text-2xl font-bold text-gray-400">--</p>
              )}
            </div>
            <MousePointer className={`h-8 w-8 ${hasWebsiteData && websiteMetrics.bounceRate ? 'text-coral-orange-600' : 'text-gray-400'}`} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">SEO Score</p>
              {hasSeoData && seoInsights.score ? (
                <p className="text-2xl font-bold text-navy-900">{seoInsights.score}%</p>
              ) : (
                <p className="text-2xl font-bold text-gray-400">--</p>
              )}
            </div>
            <Search className={`h-8 w-8 ${hasSeoData && seoInsights.score ? 'text-gold-600' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
