"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Activity,
  Database,
  ImageIcon,
  Mail,
  Server,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  BarChart3,
  Key,
  Clock,
  Send,
  Copy,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react"

interface ApiStatus {
  name: string
  service: string
  status: "active" | "inactive" | "error"
  lastCall: string
  requestsToday: number
  responseTime: number
  icon: React.ReactNode
  description: string
  endpoints: string[]
}

interface ApiCall {
  id: string
  timestamp: string
  method: string
  endpoint: string
  status: number
  responseTime: number
  service: string
}

export default function ApiManagementDashboard() {
  const [apiStatuses, setApiStatuses] = useState<ApiStatus[]>([])
  const [recentCalls, setRecentCalls] = useState<ApiCall[]>([])
  const [loading, setLoading] = useState(true)
  const [showApiKeys, setShowApiKeys] = useState<Record<string, boolean>>({})

  const [selectedApi, setSelectedApi] = useState("airtable")
  const [testMethod, setTestMethod] = useState("GET")
  const [testUrl, setTestUrl] = useState("/api/trips")
  const [testHeaders, setTestHeaders] = useState([
    { key: "Content-Type", value: "application/json", enabled: true },
    { key: "Authorization", value: "Bearer ****", enabled: true },
  ])
  const [testBody, setTestBody] = useState("")
  const [testResponse, setTestResponse] = useState<any>(null)
  const [testLoading, setTestLoading] = useState(false)
  const [responseExpanded, setResponseExpanded] = useState<Record<string, boolean>>({})

  const [selectedDocApi, setSelectedDocApi] = useState("airtable")
  const [monitoringPeriod, setMonitoringPeriod] = useState("24h")
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null)

  const apiDocumentation = {
    airtable: {
      name: "Airtable API",
      baseUrl: "https://api.airtable.com/v0",
      authentication: "Bearer Token",
      rateLimit: "5 requests per second",
      endpoints: [
        {
          method: "GET",
          path: "/api/trips",
          description: "Retrieve all trip records",
          parameters: [
            { name: "maxRecords", type: "number", required: false, description: "Maximum number of records to return" },
            {
              name: "filterByFormula",
              type: "string",
              required: false,
              description: "Airtable formula to filter records",
            },
          ],
          example: {
            request: "GET /api/trips?maxRecords=10",
            response: {
              records: [
                {
                  id: "recXXXXXXXXXXXXXX",
                  fields: {
                    name: "Antigua Kite Safari",
                    destination: "Antigua",
                    price: 2500,
                    duration: 7,
                  },
                },
              ],
            },
          },
        },
        {
          method: "POST",
          path: "/api/leads",
          description: "Create a new email lead record",
          parameters: [
            { name: "email", type: "string", required: true, description: "Email address of the lead" },
            { name: "source", type: "string", required: true, description: "Source context (e.g., 'ebook_download')" },
          ],
          example: {
            request: {
              email: "user@example.com",
              source: "ebook_download",
              timestamp: "2024-01-15T14:32:15Z",
            },
            response: {
              success: true,
              id: "recYYYYYYYYYYYYYY",
            },
          },
        },
      ],
    },
    pixabay: {
      name: "Pixabay API",
      baseUrl: "https://pixabay.com/api",
      authentication: "API Key",
      rateLimit: "100 requests per minute",
      endpoints: [
        {
          method: "GET",
          path: "/api/pixabay/search",
          description: "Search for destination-specific images",
          parameters: [
            { name: "destination", type: "string", required: true, description: "Destination name for image search" },
            { name: "count", type: "number", required: false, description: "Number of images to return (default: 12)" },
          ],
          example: {
            request: "GET /api/pixabay/search?destination=antigua&count=12",
            response: {
              images: [
                {
                  id: 123456,
                  webformatURL: "https://pixabay.com/image.jpg",
                  tags: "antigua, beach, caribbean",
                  user: "photographer_name",
                },
              ],
            },
          },
        },
      ],
    },
    email: {
      name: "Email Service API",
      baseUrl: "Internal Service",
      authentication: "Service Token",
      rateLimit: "50 requests per minute",
      endpoints: [
        {
          method: "POST",
          path: "/api/email/send",
          description: "Send transactional emails",
          parameters: [
            { name: "to", type: "string", required: true, description: "Recipient email address" },
            { name: "template", type: "string", required: true, description: "Email template ID" },
            { name: "data", type: "object", required: false, description: "Template variables" },
          ],
          example: {
            request: {
              to: "user@example.com",
              template: "welcome",
              data: { name: "John Doe" },
            },
            response: {
              success: true,
              messageId: "msg_123456789",
            },
          },
        },
      ],
    },
  }

  const monitoringStats = {
    "24h": {
      totalRequests: 156,
      successRate: 98.7,
      avgResponseTime: 245,
      errorCount: 2,
      topEndpoints: [
        { endpoint: "/api/trips", count: 47, avgTime: 180 },
        { endpoint: "/api/pixabay/search", count: 23, avgTime: 320 },
        { endpoint: "/api/leads", count: 18, avgTime: 150 },
      ],
      hourlyData: [
        { hour: "00:00", requests: 5, errors: 0 },
        { hour: "01:00", requests: 3, errors: 0 },
        { hour: "02:00", requests: 2, errors: 0 },
        { hour: "03:00", requests: 1, errors: 0 },
        { hour: "04:00", requests: 4, errors: 0 },
        { hour: "05:00", requests: 8, errors: 0 },
        { hour: "06:00", requests: 12, errors: 1 },
        { hour: "07:00", requests: 18, errors: 0 },
        { hour: "08:00", requests: 25, errors: 0 },
        { hour: "09:00", requests: 32, errors: 1 },
        { hour: "10:00", requests: 28, errors: 0 },
        { hour: "11:00", requests: 22, errors: 0 },
      ],
    },
  }

  useEffect(() => {
    const fetchRealApiData = async () => {
      try {
        // Fetch real API status data
        const statusResponse = await fetch("/api/admin/api-status")
        const statusData = await statusResponse.json()

        // Fetch real API logs
        const logsResponse = await fetch("/api/admin/api-logs")
        const logsData = await logsResponse.json()

        // Fetch real monitoring stats
        const statsResponse = await fetch("/api/admin/monitoring-stats")
        const statsData = await statsResponse.json()

        // Transform real data into the expected format
        const realApiStatuses: ApiStatus[] = [
          {
            name: "Airtable",
            service: "airtable",
            status: statusData.airtable?.status || "inactive",
            lastCall: statusData.airtable?.lastCall || "Unknown",
            requestsToday: statsData.airtable?.requestsToday || 0,
            responseTime: statusData.airtable?.responseTime || 0,
            icon: <Database className="w-6 h-6" />,
            description: "Trip data, bookings, and email leads storage",
            endpoints: ["/api/trips", "/api/bookings", "/api/leads"],
          },
          {
            name: "Pixabay",
            service: "pixabay",
            status: statusData.pixabay?.status || "inactive",
            lastCall: statusData.pixabay?.lastCall || "Unknown",
            requestsToday: statsData.pixabay?.requestsToday || 0,
            responseTime: statusData.pixabay?.responseTime || 0,
            icon: <ImageIcon className="w-6 h-6" />,
            description: "Destination gallery images and auto-repair",
            endpoints: ["/api/pixabay/search"],
          },
          {
            name: "Email Service",
            service: "email",
            status: statusData.email?.status || "inactive",
            lastCall: statusData.email?.lastCall || "Unknown",
            requestsToday: statsData.email?.requestsToday || 0,
            responseTime: statusData.email?.responseTime || 0,
            icon: <Mail className="w-6 h-6" />,
            description: "Newsletter and notification delivery",
            endpoints: ["/api/email/send", "/api/email/subscribe"],
          },
          {
            name: "Custom Webhooks",
            service: "webhooks",
            status: statusData.webhooks?.status || "inactive",
            lastCall: statusData.webhooks?.lastCall || "Unknown",
            requestsToday: statsData.webhooks?.requestsToday || 0,
            responseTime: statusData.webhooks?.responseTime || 0,
            icon: <Server className="w-6 h-6" />,
            description: "Third-party integrations and callbacks",
            endpoints: ["/api/webhooks/booking", "/api/webhooks/payment"],
          },
        ]

        setApiStatuses(realApiStatuses)
        setRecentCalls(logsData.recentCalls || [])
        setLoading(false)
      } catch (error) {
        console.error("[v0] Failed to fetch real API data:", error)
        // Fallback to show error state
        setLoading(false)
      }
    }

    fetchRealApiData()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />
      case "inactive":
        return <AlertCircle className="w-5 h-5 text-amber-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500"
      case "inactive":
        return "bg-amber-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-400"
    }
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bg-blue-100 text-blue-800"
      case "POST":
        return "bg-green-100 text-green-800"
      case "PUT":
        return "bg-amber-100 text-amber-800"
      case "DELETE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusCodeColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-emerald-600"
    if (status >= 400 && status < 500) return "text-amber-600"
    if (status >= 500) return "text-red-600"
    return "text-gray-600"
  }

  const toggleApiKeyVisibility = (service: string) => {
    setShowApiKeys((prev) => ({
      ...prev,
      [service]: !prev[service],
    }))
  }

  const maskApiKey = (key: string, show: boolean) => {
    if (show) return key
    return `${"*".repeat(key.length - 4)}${key.slice(-4)}`
  }

  const addHeader = () => {
    setTestHeaders([...testHeaders, { key: "", value: "", enabled: true }])
  }

  const removeHeader = (index: number) => {
    setTestHeaders(testHeaders.filter((_, i) => i !== index))
  }

  const updateHeader = (index: number, field: "key" | "value" | "enabled", value: string | boolean) => {
    const updated = [...testHeaders]
    updated[index] = { ...updated[index], [field]: value }
    setTestHeaders(updated)
  }

  const sendTestRequest = async () => {
    setTestLoading(true)
    const startTime = Date.now()

    try {
      // Make real API call through the admin testing proxy
      const response = await fetch("/api/admin/api-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: selectedApi,
          method: testMethod,
          url: testUrl,
          headers: testHeaders
            .filter((h) => h.enabled)
            .reduce(
              (acc, h) => ({
                ...acc,
                [h.key]: h.value,
              }),
              {},
            ),
          body: testBody ? JSON.parse(testBody) : undefined,
        }),
      })

      const responseData = await response.json()
      const responseTime = Date.now() - startTime

      setTestResponse({
        status: response.status,
        statusText: response.statusText,
        headers: {
          "content-type": response.headers.get("content-type") || "application/json",
          "x-response-time": `${responseTime}ms`,
        },
        data: responseData,
        responseTime: responseTime,
      })
    } catch (error) {
      setTestResponse({
        status: 500,
        statusText: "Internal Server Error",
        headers: {},
        data: { error: error instanceof Error ? error.message : "Request failed" },
        responseTime: Date.now() - startTime,
      })
    } finally {
      setTestLoading(false)
    }
  }

  const formatJson = (obj: any) => {
    return JSON.stringify(obj, null, 2)
  }

  const toggleJsonExpansion = (path: string) => {
    setResponseExpanded((prev) => ({
      ...prev,
      [path]: !prev[path],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const toggleEndpointExpansion = (endpointId: string) => {
    setExpandedEndpoint(expandedEndpoint === endpointId ? null : endpointId)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCw className="w-8 h-8 animate-spin text-turquoise-500" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-deep-navy-900">API Management</h1>
          <p className="text-deep-navy-600 font-open-sans mt-2">
            Monitor, test, and manage all integrated API services
          </p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh Status
        </Button>
      </div>

      {/* API Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {apiStatuses.map((api) => (
          <Card
            key={api.service}
            className="relative overflow-hidden border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-turquoise-100 rounded-lg">{api.icon}</div>
                  <div>
                    <CardTitle className="text-lg font-montserrat text-deep-navy-900">{api.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(api.status)}
                      <span className="text-sm font-open-sans text-deep-navy-600 capitalize">{api.status}</span>
                    </div>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(api.status)}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-deep-navy-600 font-open-sans">{api.description}</p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-deep-navy-500 font-open-sans">Last Call</div>
                  <div className="font-medium text-deep-navy-900">{api.lastCall}</div>
                </div>
                <div>
                  <div className="text-deep-navy-500 font-open-sans">Today</div>
                  <div className="font-medium text-deep-navy-900">{api.requestsToday} calls</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-turquoise-200/50">
                <div className="text-sm">
                  <span className="text-deep-navy-500 font-open-sans">Avg Response: </span>
                  <span className="font-medium text-deep-navy-900">{api.responseTime}ms</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {api.endpoints.length} endpoints
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for detailed views */}
      <Tabs defaultValue="monitoring" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-turquoise-50/50 backdrop-blur-sm">
          <TabsTrigger value="monitoring" className="gap-2">
            <Activity className="w-4 h-4" />
            Monitoring
          </TabsTrigger>
          <TabsTrigger value="testing" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Testing
          </TabsTrigger>
          <TabsTrigger value="documentation" className="gap-2">
            <Server className="w-4 h-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Key className="w-4 h-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Activity className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-montserrat text-deep-navy-900">
                      {monitoringStats["24h"].totalRequests}
                    </div>
                    <div className="text-sm text-deep-navy-600 font-open-sans">Total Requests (24h)</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-montserrat text-deep-navy-900">
                      {monitoringStats["24h"].successRate}%
                    </div>
                    <div className="text-sm text-deep-navy-600 font-open-sans">Success Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-turquoise-100 rounded-lg">
                    <Clock className="w-5 h-5 text-turquoise-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-montserrat text-deep-navy-900">
                      {monitoringStats["24h"].avgResponseTime}ms
                    </div>
                    <div className="text-sm text-deep-navy-600 font-open-sans">Avg Response Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <XCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-montserrat text-deep-navy-900">
                      {monitoringStats["24h"].errorCount}
                    </div>
                    <div className="text-sm text-deep-navy-600 font-open-sans">Errors (24h)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Endpoints */}
            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="font-montserrat text-deep-navy-900">Top Endpoints (24h)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monitoringStats["24h"].topEndpoints.map((endpoint, index) => (
                    <div key={endpoint.endpoint} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-turquoise-100 rounded-full flex items-center justify-center text-sm font-medium text-turquoise-700">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-deep-navy-900 font-open-sans">{endpoint.endpoint}</div>
                          <div className="text-sm text-deep-navy-600">{endpoint.count} requests</div>
                        </div>
                      </div>
                      <div className="text-sm text-deep-navy-600">{endpoint.avgTime}ms avg</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent API Calls */}
            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-montserrat text-deep-navy-900">
                  <Clock className="w-5 h-5" />
                  Recent API Calls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentCalls.map((call) => (
                    <div
                      key={call.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/60 border border-turquoise-200/30"
                    >
                      <div className="flex items-center gap-4">
                        <Badge className={`${getMethodColor(call.method)} border-0`}>{call.method}</Badge>
                        <div>
                          <div className="font-medium text-deep-navy-900 font-open-sans">{call.endpoint}</div>
                          <div className="text-sm text-deep-navy-500">
                            {call.service} • {call.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`font-medium ${getStatusCodeColor(call.status)}`}>{call.status}</span>
                        <span className="text-deep-navy-600">{call.responseTime}ms</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* API Selection Sidebar */}
            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="font-montserrat text-deep-navy-900">Select API</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {apiStatuses.map((api) => (
                  <button
                    key={api.service}
                    onClick={() => {
                      setSelectedApi(api.service)
                      setTestUrl(api.endpoints[0] || "")
                    }}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedApi === api.service
                        ? "bg-turquoise-100 border-2 border-turquoise-300"
                        : "bg-white/60 border border-turquoise-200/30 hover:bg-turquoise-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-turquoise-100 rounded-lg">{api.icon}</div>
                      <div>
                        <div className="font-medium text-deep-navy-900 font-montserrat">{api.name}</div>
                        <div className="text-sm text-deep-navy-600 font-open-sans">
                          {api.endpoints.length} endpoints
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Request Configuration */}
            <Card className="lg:col-span-2 border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="font-montserrat text-deep-navy-900">API Testing Interface</CardTitle>
                <p className="text-deep-navy-600 font-open-sans">
                  Test API endpoints with custom parameters and headers
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Method and URL */}
                <div className="flex gap-3">
                  <Select value={testMethod} onValueChange={setTestMethod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={testUrl}
                    onChange={(e) => setTestUrl(e.target.value)}
                    placeholder="Enter API endpoint"
                    className="flex-1"
                  />
                  <Button onClick={sendTestRequest} disabled={testLoading} className="gap-2">
                    {testLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    Send
                  </Button>
                </div>

                {/* Headers Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="font-montserrat text-deep-navy-900">Headers</Label>
                    <Button variant="outline" size="sm" onClick={addHeader} className="gap-2 bg-transparent">
                      <Plus className="w-4 h-4" />
                      Add Header
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {testHeaders.map((header, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={header.enabled}
                          onChange={(e) => updateHeader(index, "enabled", e.target.checked)}
                          className="rounded"
                        />
                        <Input
                          value={header.key}
                          onChange={(e) => updateHeader(index, "key", e.target.value)}
                          placeholder="Header name"
                          className="flex-1"
                        />
                        <Input
                          value={header.value}
                          onChange={(e) => updateHeader(index, "value", e.target.value)}
                          placeholder="Header value"
                          className="flex-1"
                          type={header.key.toLowerCase().includes("auth") ? "password" : "text"}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeHeader(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Request Body */}
                {(testMethod === "POST" || testMethod === "PUT") && (
                  <div className="space-y-3">
                    <Label className="font-montserrat text-deep-navy-900">Request Body (JSON)</Label>
                    <Textarea
                      value={testBody}
                      onChange={(e) => setTestBody(e.target.value)}
                      placeholder='{\n  "key": "value"\n}'
                      className="min-h-32 font-mono text-sm"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Response Panel */}
          {testResponse && (
            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-montserrat text-deep-navy-900">Response</CardTitle>
                  <div className="flex items-center gap-4">
                    <Badge className={`${getStatusCodeColor(testResponse.status)} bg-transparent border`}>
                      {testResponse.status} {testResponse.statusText}
                    </Badge>
                    <span className="text-sm text-deep-navy-600">{testResponse.responseTime}ms</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(formatJson(testResponse.data))}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Response Headers */}
                <div>
                  <button
                    onClick={() => toggleJsonExpansion("headers")}
                    className="flex items-center gap-2 font-medium text-deep-navy-900 font-montserrat mb-2"
                  >
                    {responseExpanded.headers ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    Response Headers
                  </button>
                  {responseExpanded.headers && (
                    <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                      <pre>{formatJson(testResponse.headers)}</pre>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Response Body */}
                <div>
                  <div className="flex items-center gap-2 font-medium text-deep-navy-900 font-montserrat mb-2">
                    Response Body
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm max-h-96 overflow-auto">
                    <pre className="whitespace-pre-wrap">{formatJson(testResponse.data)}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documentation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* API Selection Sidebar */}
            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="font-montserrat text-deep-navy-900">APIs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(apiDocumentation).map(([key, api]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedDocApi(key)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      selectedDocApi === key
                        ? "bg-turquoise-100 border-2 border-turquoise-300"
                        : "bg-white/60 border border-turquoise-200/30 hover:bg-turquoise-50"
                    }`}
                  >
                    <div className="font-medium text-deep-navy-900 font-montserrat">{api.name}</div>
                    <div className="text-sm text-deep-navy-600 font-open-sans">{api.endpoints.length} endpoints</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* API Documentation Content */}
            <div className="lg:col-span-3 space-y-6">
              {selectedDocApi && apiDocumentation[selectedDocApi as keyof typeof apiDocumentation] && (
                <>
                  {/* API Overview */}
                  <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-montserrat text-deep-navy-900">
                        {apiDocumentation[selectedDocApi as keyof typeof apiDocumentation].name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="font-montserrat text-deep-navy-900">Base URL</Label>
                          <div className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
                            {apiDocumentation[selectedDocApi as keyof typeof apiDocumentation].baseUrl}
                          </div>
                        </div>
                        <div>
                          <Label className="font-montserrat text-deep-navy-900">Authentication</Label>
                          <div className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
                            {apiDocumentation[selectedDocApi as keyof typeof apiDocumentation].authentication}
                          </div>
                        </div>
                        <div>
                          <Label className="font-montserrat text-deep-navy-900">Rate Limit</Label>
                          <div className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">
                            {apiDocumentation[selectedDocApi as keyof typeof apiDocumentation].rateLimit}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Endpoints */}
                  <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-montserrat text-deep-navy-900">Endpoints</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {apiDocumentation[selectedDocApi as keyof typeof apiDocumentation].endpoints.map(
                        (endpoint, index) => {
                          const endpointId = `${selectedDocApi}-${index}`
                          const isExpanded = expandedEndpoint === endpointId

                          return (
                            <div key={endpointId} className="border border-turquoise-200/30 rounded-lg overflow-hidden">
                              <button
                                onClick={() => toggleEndpointExpansion(endpointId)}
                                className="w-full p-4 bg-white/60 hover:bg-turquoise-50/50 transition-colors flex items-center justify-between"
                              >
                                <div className="flex items-center gap-4">
                                  <Badge className={`${getMethodColor(endpoint.method)} border-0`}>
                                    {endpoint.method}
                                  </Badge>
                                  <div className="text-left">
                                    <div className="font-mono text-sm text-deep-navy-900">{endpoint.path}</div>
                                    <div className="text-sm text-deep-navy-600 font-open-sans">
                                      {endpoint.description}
                                    </div>
                                  </div>
                                </div>
                                {isExpanded ? (
                                  <ChevronDown className="w-5 h-5 text-deep-navy-600" />
                                ) : (
                                  <ChevronRight className="w-5 h-5 text-deep-navy-600" />
                                )}
                              </button>

                              {isExpanded && (
                                <div className="p-4 bg-white/40 border-t border-turquoise-200/30 space-y-4">
                                  {/* Parameters */}
                                  {endpoint.parameters.length > 0 && (
                                    <div>
                                      <Label className="font-montserrat text-deep-navy-900 mb-2 block">
                                        Parameters
                                      </Label>
                                      <div className="space-y-2">
                                        {endpoint.parameters.map((param, paramIndex) => (
                                          <div
                                            key={paramIndex}
                                            className="flex items-center gap-4 p-2 bg-gray-50 rounded"
                                          >
                                            <Badge variant={param.required ? "default" : "outline"} className="text-xs">
                                              {param.required ? "Required" : "Optional"}
                                            </Badge>
                                            <div className="flex-1">
                                              <div className="font-mono text-sm text-deep-navy-900">{param.name}</div>
                                              <div className="text-xs text-deep-navy-600">{param.type}</div>
                                            </div>
                                            <div className="text-sm text-deep-navy-600 font-open-sans">
                                              {param.description}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Example */}
                                  <div>
                                    <Label className="font-montserrat text-deep-navy-900 mb-2 block">Example</Label>
                                    <div className="space-y-3">
                                      <div>
                                        <div className="text-sm font-medium text-deep-navy-700 mb-1">Request</div>
                                        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
                                          <pre>
                                            {typeof endpoint.example.request === "string"
                                              ? endpoint.example.request
                                              : JSON.stringify(endpoint.example.request, null, 2)}
                                          </pre>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium text-deep-navy-700 mb-1">Response</div>
                                        <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm overflow-x-auto">
                                          <pre>{JSON.stringify(endpoint.example.response, null, 2)}</pre>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        },
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Keys Management */}
            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-montserrat text-deep-navy-900">
                  <Key className="w-5 h-5" />
                  API Keys Management
                </CardTitle>
                <p className="text-deep-navy-600 font-open-sans">Manage and rotate API keys securely</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiStatuses.map((api) => (
                  <div key={api.service} className="p-4 border border-turquoise-200/30 rounded-lg bg-white/40">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-turquoise-100 rounded-lg">{api.icon}</div>
                        <div>
                          <div className="font-medium text-deep-navy-900 font-montserrat">{api.name}</div>
                          <div className="text-sm text-deep-navy-600 font-open-sans">
                            {api.status === "active" ? "Connected" : "Disconnected"}
                          </div>
                        </div>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(api.status)}`} />
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-montserrat text-deep-navy-900">API Key</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            type={showApiKeys[api.service] ? "text" : "password"}
                            value={showApiKeys[api.service] ? `sk_live_1234567890abcdef` : `${"*".repeat(20)}cdef`}
                            readOnly
                            className="flex-1 font-mono text-sm"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleApiKeyVisibility(api.service)}
                            className="gap-2"
                          >
                            {showApiKeys[api.service] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard("sk_live_1234567890abcdef")}
                            className="gap-2"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <RefreshCw className="w-4 h-4" />
                          Rotate Key
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          Test Connection
                        </Button>
                      </div>

                      <div className="text-xs text-deep-navy-500 font-open-sans">
                        Last rotated: 30 days ago • Expires: Never
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Environment Configuration */}
            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-montserrat text-deep-navy-900">
                  <Server className="w-5 h-5" />
                  Environment Configuration
                </CardTitle>
                <p className="text-deep-navy-600 font-open-sans">Manage environment settings and variables</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-montserrat text-deep-navy-900">Current Environment</Label>
                  <Select defaultValue="production">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                // Show real environment variable status
                <div className="space-y-3">
                  <Label className="font-montserrat text-deep-navy-900">Environment Variables</Label>
                  <div className="space-y-2">
                    {[
                      {
                        key: "AIRTABLE_API_KEY",
                        value: process.env.AIRTABLE_API_KEY
                          ? `${process.env.AIRTABLE_API_KEY.slice(0, 3)}***`
                          : "Not set",
                        status: process.env.AIRTABLE_API_KEY ? "active" : "inactive",
                      },
                      {
                        key: "AIRTABLE_BASE_ID",
                        value: process.env.AIRTABLE_BASE_ID
                          ? `${process.env.AIRTABLE_BASE_ID.slice(0, 3)}***`
                          : "Not set",
                        status: process.env.AIRTABLE_BASE_ID ? "active" : "inactive",
                      },
                      {
                        key: "PIXABAY_API_KEY",
                        value: process.env.PIXABAY_API_KEY
                          ? `${process.env.PIXABAY_API_KEY.slice(0, 3)}***`
                          : "Not set",
                        status: process.env.PIXABAY_API_KEY ? "active" : "inactive",
                      },
                    ].map((envVar, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${envVar.status === "active" ? "bg-emerald-500" : "bg-gray-400"}`}
                          />
                          <div>
                            <div className="font-mono text-sm text-deep-navy-900">{envVar.key}</div>
                            <div className="text-xs text-deep-navy-600">{envVar.value}</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Plus className="w-4 h-4" />
                  Add Environment Variable
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Rate Limiting & Security Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-montserrat text-deep-navy-900">
                  <Activity className="w-5 h-5" />
                  Rate Limiting
                </CardTitle>
                <p className="text-deep-navy-600 font-open-sans">Configure API rate limits and quotas</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiStatuses.map((api) => (
                  <div key={api.service} className="p-4 border border-turquoise-200/30 rounded-lg bg-white/40">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-1 bg-turquoise-100 rounded">{api.icon}</div>
                        <div className="font-medium text-deep-navy-900 font-montserrat">{api.name}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {api.requestsToday}/1000 today
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-montserrat text-deep-navy-900">Requests per minute</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input type="number" defaultValue="60" className="flex-1" />
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-montserrat text-deep-navy-900">Daily quota</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input type="number" defaultValue="1000" className="flex-1" />
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-turquoise-500 h-2 rounded-full"
                          style={{ width: `${(api.requestsToday / 1000) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-deep-navy-600 font-open-sans">
                        {api.requestsToday} of 1000 requests used today ({((api.requestsToday / 1000) * 100).toFixed(1)}
                        %)
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-montserrat text-deep-navy-900">
                  <AlertCircle className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <p className="text-deep-navy-600 font-open-sans">Configure security policies and access controls</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                    <div>
                      <div className="font-medium text-deep-navy-900 font-montserrat">API Key Rotation</div>
                      <div className="text-sm text-deep-navy-600 font-open-sans">
                        Automatically rotate keys every 90 days
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                    <div>
                      <div className="font-medium text-deep-navy-900 font-montserrat">IP Whitelisting</div>
                      <div className="text-sm text-deep-navy-600 font-open-sans">
                        Restrict API access to specific IP addresses
                      </div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                    <div>
                      <div className="font-medium text-deep-navy-900 font-montserrat">Request Logging</div>
                      <div className="text-sm text-deep-navy-600 font-open-sans">
                        Log all API requests for audit trail
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg">
                    <div>
                      <div className="font-medium text-deep-navy-900 font-montserrat">Error Notifications</div>
                      <div className="text-sm text-deep-navy-600 font-open-sans">
                        Send alerts when error rate exceeds 5%
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="font-montserrat text-deep-navy-900">Allowed Origins (CORS)</Label>
                  <Textarea
                    placeholder="https://kitesafaris.com&#10;https://admin.kitesafaris.com"
                    className="mt-1 min-h-20 font-mono text-sm"
                  />
                </div>

                <Button className="w-full">Save Security Settings</Button>
              </CardContent>
            </Card>
          </div>

          {/* Audit Trail */}
          <Card className="border-0 bg-gradient-to-br from-white/90 to-turquoise-50/50 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-montserrat text-deep-navy-900">
                <Clock className="w-5 h-5" />
                Security Audit Trail
              </CardTitle>
              <p className="text-deep-navy-600 font-open-sans">Recent security-related actions and events</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    timestamp: "2024-01-15 14:32:15",
                    action: "API Key Viewed",
                    service: "Airtable",
                    user: "admin@kitesafaris.com",
                    severity: "low",
                  },
                  {
                    timestamp: "2024-01-15 09:15:22",
                    action: "Rate Limit Updated",
                    service: "Pixabay",
                    user: "admin@kitesafaris.com",
                    severity: "medium",
                  },
                  {
                    timestamp: "2024-01-14 16:45:33",
                    action: "Failed Authentication",
                    service: "Email Service",
                    user: "unknown",
                    severity: "high",
                  },
                  {
                    timestamp: "2024-01-14 11:20:18",
                    action: "Environment Switched",
                    service: "System",
                    user: "admin@kitesafaris.com",
                    severity: "medium",
                  },
                ].map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/60 border border-turquoise-200/30"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          event.severity === "high"
                            ? "bg-red-500"
                            : event.severity === "medium"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        }`}
                      />
                      <div>
                        <div className="font-medium text-deep-navy-900 font-open-sans">{event.action}</div>
                        <div className="text-sm text-deep-navy-600">
                          {event.service} • {event.user} • {event.timestamp}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        event.severity === "high"
                          ? "border-red-200 text-red-700"
                          : event.severity === "medium"
                            ? "border-amber-200 text-amber-700"
                            : "border-emerald-200 text-emerald-700"
                      }`}
                    >
                      {event.severity}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-turquoise-200/50">
                <div className="text-sm text-deep-navy-600 font-open-sans">Showing 4 of 127 events</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Export Logs
                  </Button>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
