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
}

export function DashboardMetrics({ websiteMetrics, businessMetrics, seoInsights, alerts }: DashboardMetricsProps) {
  // Mock data for demonstration - in production, this would come from the API
  const trafficData = [
    { date: "2024-01-01", visitors: 1200, pageViews: 3400, bounceRate: 45 },
    { date: "2024-01-02", visitors: 1350, pageViews: 3800, bounceRate: 42 },
    { date: "2024-01-03", visitors: 1100, pageViews: 3200, bounceRate: 48 },
    { date: "2024-01-04", visitors: 1500, pageViews: 4200, bounceRate: 40 },
    { date: "2024-01-05", visitors: 1800, pageViews: 5100, bounceRate: 38 },
    { date: "2024-01-06", visitors: 1600, pageViews: 4600, bounceRate: 41 },
    { date: "2024-01-07", visitors: 1400, pageViews: 3900, bounceRate: 44 },
  ]

  const deviceData = [
    { name: "Desktop", value: 65, color: "#0891b2" },
    { name: "Mobile", value: 28, color: "#ea580c" },
    { name: "Tablet", value: 7, color: "#ca8a04" },
  ]

  const topPages = [
    { page: "/", visitors: 2400, bounceRate: 35, avgTime: "2:45" },
    { page: "/destinations/antigua", visitors: 1800, bounceRate: 28, avgTime: "3:20" },
    { page: "/booking", visitors: 1200, bounceRate: 45, avgTime: "4:15" },
    { page: "/destinations/sardinia", visitors: 900, bounceRate: 32, avgTime: "2:55" },
    { page: "/blog", visitors: 750, bounceRate: 55, avgTime: "1:45" },
  ]

  const bottomPages = [
    { page: "/privacy", visitors: 45, bounceRate: 85, avgTime: "0:30" },
    { page: "/terms", visitors: 32, bounceRate: 90, avgTime: "0:25" },
    { page: "/contact/prokite", visitors: 28, bounceRate: 75, avgTime: "1:15" },
    { page: "/settings", visitors: 15, bounceRate: 95, avgTime: "0:20" },
    { page: "/users", visitors: 8, bounceRate: 100, avgTime: "0:10" },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Website Traffic */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Visitors</p>
              <p className="text-3xl font-bold text-navy-900">12.4k</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.5%</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-turquoise-100 rounded-lg">
              <Users className="h-6 w-6 text-turquoise-600" />
            </div>
          </div>
        </div>

        {/* Page Views */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Page Views</p>
              <p className="text-3xl font-bold text-navy-900">34.2k</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8.3%</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-coral-orange-100 rounded-lg">
              <Eye className="h-6 w-6 text-coral-orange-600" />
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-3xl font-bold text-navy-900">€45.6k</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+15.2%</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-gold-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-gold-600" />
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Bookings</p>
              <p className="text-3xl font-bold text-navy-900">24</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+20%</span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Calendar className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Trend */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Traffic Trends</h3>
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
          </div>
          <div className="h-64">
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
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
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
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Device Breakdown</h3>
            <div className="flex items-center space-x-2">
              <Monitor className="h-4 w-4 text-gray-500" />
              <Smartphone className="h-4 w-4 text-gray-500" />
              <Tablet className="h-4 w-4 text-gray-500" />
            </div>
          </div>
          <div className="h-64">
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
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-4 space-y-2">
            {deviceData.map((device, index) => (
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
        </div>
      </div>

      {/* Top and Bottom Performing Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Pages */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Top Performing Pages</h3>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <div className="space-y-4">
            {topPages.map((page, index) => (
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
            ))}
          </div>
        </div>

        {/* Bottom Performing Pages */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Pages Needing Attention</h3>
            <TrendingDown className="h-5 w-5 text-red-500" />
          </div>
          <div className="space-y-4">
            {bottomPages.map((page, index) => (
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
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Session Duration</p>
              <p className="text-2xl font-bold text-navy-900">2:45</p>
            </div>
            <Clock className="h-8 w-8 text-turquoise-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
              <p className="text-2xl font-bold text-navy-900">42.3%</p>
            </div>
            <MousePointer className="h-8 w-8 text-coral-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">SEO Score</p>
              <p className="text-2xl font-bold text-navy-900">85%</p>
            </div>
            <Search className="h-8 w-8 text-gold-600" />
          </div>
        </div>
      </div>
    </div>
  )
}
