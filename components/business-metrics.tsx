"use client"

import { useState } from "react"
import { 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Mail,
  Phone,
  Globe,
  MapPin,
  Star,
  Clock,
  Target,
  Award,
  UserCheck,
  UserX
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface BusinessMetricsProps {
  data: any
  dateRange: string
}

export function BusinessMetrics({ data, dateRange }: BusinessMetricsProps) {
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  // Mock data for demonstration
  const revenueData = [
    { month: "Jan", revenue: 42000, bookings: 18, avgBooking: 2333 },
    { month: "Feb", revenue: 38000, bookings: 16, avgBooking: 2375 },
    { month: "Mar", revenue: 45000, bookings: 20, avgBooking: 2250 },
    { month: "Apr", revenue: 52000, bookings: 22, avgBooking: 2364 },
    { month: "May", revenue: 48000, bookings: 19, avgBooking: 2526 },
    { month: "Jun", revenue: 56000, bookings: 24, avgBooking: 2333 },
  ]

  const leadSources = [
    { source: "Website Form", leads: 45, conversions: 12, rate: 26.7, color: "#0891b2" },
    { source: "Organic Search", leads: 38, conversions: 15, rate: 39.5, color: "#ea580c" },
    { source: "Social Media", leads: 22, conversions: 6, rate: 27.3, color: "#ca8a04" },
    { source: "Referral", leads: 18, conversions: 8, rate: 44.4, color: "#16a34a" },
    { source: "Email Campaign", leads: 15, conversions: 4, rate: 26.7, color: "#dc2626" },
    { source: "Direct Contact", leads: 12, conversions: 7, rate: 58.3, color: "#9333ea" },
  ]

  const destinations = [
    { destination: "Antigua", bookings: 24, revenue: 48000, avgPrice: 2000, satisfaction: 4.9 },
    { destination: "Sardinia", bookings: 18, revenue: 36000, avgPrice: 2000, satisfaction: 4.8 },
    { destination: "Greece", bookings: 12, revenue: 24000, avgPrice: 2000, satisfaction: 4.7 },
    { destination: "Croatia", bookings: 8, revenue: 16000, avgPrice: 2000, satisfaction: 4.6 },
    { destination: "Barbados", bookings: 6, revenue: 12000, avgPrice: 2000, satisfaction: 4.8 },
  ]

  const customerDemographics = [
    { country: "Germany", customers: 35, percentage: 28, revenue: 70000 },
    { country: "Netherlands", customers: 28, percentage: 22, revenue: 56000 },
    { country: "UK", customers: 22, percentage: 18, revenue: 44000 },
    { country: "France", customers: 18, percentage: 14, revenue: 36000 },
    { country: "Switzerland", customers: 12, percentage: 10, revenue: 24000 },
    { country: "Other", customers: 8, percentage: 8, revenue: 16000 },
  ]

  const conversionFunnel = [
    { stage: "Website Visitors", count: 12400, percentage: 100 },
    { stage: "Lead Generation", count: 248, percentage: 2.0 },
    { stage: "Inquiries", count: 186, percentage: 1.5 },
    { stage: "Proposals Sent", count: 124, percentage: 1.0 },
    { stage: "Bookings", count: 68, percentage: 0.55 },
  ]

  const recentBookings = [
    { id: "BK001", customer: "John Smith", destination: "Antigua", amount: 2400, date: "2024-01-15", status: "confirmed" },
    { id: "BK002", customer: "Maria Garcia", destination: "Sardinia", amount: 2200, date: "2024-01-14", status: "confirmed" },
    { id: "BK003", customer: "David Johnson", destination: "Greece", amount: 2000, date: "2024-01-13", status: "pending" },
    { id: "BK004", customer: "Anna Müller", destination: "Antigua", amount: 2400, date: "2024-01-12", status: "confirmed" },
    { id: "BK005", customer: "Pierre Dubois", destination: "Croatia", amount: 1800, date: "2024-01-11", status: "confirmed" },
  ]

  const ebookSubscribers = [
    { month: "Jan", subscribers: 45, downloads: 120 },
    { month: "Feb", subscribers: 52, downloads: 135 },
    { month: "Mar", subscribers: 48, downloads: 128 },
    { month: "Apr", subscribers: 61, downloads: 155 },
    { month: "May", subscribers: 58, downloads: 142 },
    { month: "Jun", subscribers: 67, downloads: 168 },
  ]

  return (
    <div className="space-y-6">
      {/* Key Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-navy-900">€281k</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+15.2%</span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="p-3 bg-gold-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-gold-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-3xl font-bold text-navy-900">68</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.5%</span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Calendar className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-navy-900">36.6%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+3.2%</span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
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
              <p className="text-sm font-medium text-gray-600">Avg Booking Value</p>
              <p className="text-3xl font-bold text-navy-900">€4,132</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2.1%</span>
                <span className="text-sm text-gray-500 ml-1">vs last period</span>
              </div>
            </div>
            <div className="p-3 bg-coral-orange-100 rounded-lg">
              <Award className="h-6 w-6 text-coral-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue and Bookings Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-navy-900">Revenue & Bookings Trend</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gold-500 rounded-full mr-2"></div>
              <span className="text-sm">Revenue</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-turquoise-500 rounded-full mr-2"></div>
              <span className="text-sm">Bookings</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue (€)",
                color: "hsl(var(--color-gold))",
              },
              bookings: {
                label: "Bookings",
                color: "hsl(var(--color-turquoise))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-gold)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-gold)", strokeWidth: 2, r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="bookings"
                  stroke="var(--color-turquoise)"
                  strokeWidth={3}
                  dot={{ fill: "var(--color-turquoise)", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* Lead Sources and Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Lead Sources</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {leadSources.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-navy-900">{source.source}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{source.leads} leads</span>
                    <span className="text-sm font-bold text-turquoise-600">{source.conversions} converted</span>
                    <span className="text-sm font-bold text-green-600">{source.rate}%</span>
                  </div>
                </div>
                <div className="w-full bg-sand-beige-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ width: `${(source.conversions / source.leads) * 100}%`, backgroundColor: source.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-navy-900">Conversion Funnel</h3>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {conversionFunnel.map((stage, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-sand-beige-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-navy-900">{stage.stage}</p>
                  <p className="text-sm text-gray-600">{stage.count.toLocaleString()} people</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-turquoise-600">{stage.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Destinations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-navy-900">Top Destinations</h3>
          <MapPin className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {destinations.map((destination, index) => (
            <div key={index} className="text-center p-4 bg-sand-beige-50 rounded-lg">
              <div className="text-2xl font-bold text-navy-900 mb-2">{destination.bookings}</div>
              <div className="text-lg font-medium text-gray-700 mb-2">{destination.destination}</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>€{destination.revenue.toLocaleString()}</div>
                <div className="flex items-center justify-center">
                  <Star className="h-4 w-4 text-gold-500 mr-1" />
                  <span>{destination.satisfaction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Demographics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-navy-900">Customer Demographics</h3>
          <Globe className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {customerDemographics.map((demo, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-sand-beige-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-navy-900">{demo.country}</p>
                  <p className="text-sm text-gray-600">{demo.customers} customers</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-turquoise-600">{demo.percentage}%</div>
                  <div className="text-sm text-gray-600">€{demo.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-64">
            <ChartContainer
              config={{
                customers: {
                  label: "Customers",
                  color: "hsl(var(--color-turquoise))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerDemographics}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="customers"
                  >
                    {customerDemographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`hsl(${200 + index * 40}, 70%, 50%)`} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-navy-900">Recent Bookings</h3>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-beige-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Booking ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Destination</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking, index) => (
                <tr key={index} className="border-b border-sand-beige-100">
                  <td className="py-3 px-4 font-medium text-navy-900">{booking.id}</td>
                  <td className="py-3 px-4 text-gray-700">{booking.customer}</td>
                  <td className="py-3 px-4 text-gray-700">{booking.destination}</td>
                  <td className="py-3 px-4 text-gray-700">€{booking.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-700">{booking.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ebook Subscribers */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-sand-beige-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-navy-900">Ebook Subscribers</h3>
          <Mail className="h-5 w-5 text-gray-400" />
        </div>
        <div className="h-64">
          <ChartContainer
            config={{
              subscribers: {
                label: "Subscribers",
                color: "hsl(var(--color-turquoise))",
              },
              downloads: {
                label: "Downloads",
                color: "hsl(var(--color-coral-orange))",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ebookSubscribers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="subscribers" fill="var(--color-turquoise)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="downloads" fill="var(--color-coral-orange)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  )
}
