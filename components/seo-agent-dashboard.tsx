"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  Pause,
  Settings,
  Eye,
  CheckCircle,
  AlertCircle,
  Search,
  BarChart3,
  FileText,
  ImageIcon,
  Clock,
  Bell,
  RotateCcw,
  TrendingUp,
} from "lucide-react"
import { ChangePreviewModal } from "./change-preview-modal"
import { BulkApprovalPanel } from "./bulk-approval-panel"
import { AutomationSettings } from "./automation-settings"
import { SEOReportingDashboard } from "./seo-reporting-dashboard"
import { RollbackManager } from "./rollback-manager"

type OptimizationStatus = "idle" | "running" | "completed" | "error"
type ChangeStatus = "pending" | "approved" | "rejected"
type DashboardTab = "optimization" | "reporting" | "rollback"

interface OptimizationChange {
  id: string
  type: "meta" | "image" | "schema" | "link"
  page: string
  description: string
  before: string
  after: string
  status: ChangeStatus
  impact: "high" | "medium" | "low"
}

export function SEOAgentDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("optimization")
  const [status, setStatus] = useState<OptimizationStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [currentTask, setCurrentTask] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const [selectedChange, setSelectedChange] = useState<OptimizationChange | null>(null)
  const [showBulkPanel, setShowBulkPanel] = useState(false)
  const [selectedChangeForPreview, setSelectedChangeForPreview] = useState<OptimizationChange | null>(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [showAutomationSettings, setShowAutomationSettings] = useState(false)

  const [changes, setChanges] = useState<OptimizationChange[]>([
    {
      id: "1",
      type: "meta",
      page: "/destinations/antigua",
      description: 'Updated meta title to target "Caribbean Kite Safari Antigua"',
      before: "Antigua Destination - KiteSafaris",
      after: "Caribbean Kite Safari Antigua | 7-Day Luxury Catamaran Trip | KiteSafaris",
      status: "pending",
      impact: "high",
    },
    {
      id: "2",
      type: "image",
      page: "/packages",
      description: "Optimized alt text for hero image with target keywords",
      before: "Catamaran sailing",
      after: "Luxury catamaran Caribbean kite safari Antigua kiteboarding adventure",
      status: "pending",
      impact: "medium",
    },
    {
      id: "3",
      type: "schema",
      page: "/booking",
      description: "Added structured data for booking actions and travel events",
      before: "No structured data",
      after: "JSON-LD schema for TravelEvent and BookingAction",
      status: "pending",
      impact: "high",
    },
  ])

  const [logs, setLogs] = useState([
    { time: "14:32:15", message: "SEO Agent initialized", type: "info" },
    { time: "14:32:16", message: "Starting site crawl...", type: "info" },
    { time: "14:32:18", message: "Found 23 pages to analyze", type: "success" },
    { time: "14:32:20", message: "Analyzing Caribbean kite safari keywords...", type: "info" },
  ])

  const handleStartOptimization = () => {
    setStatus("running")
    setProgress(0)
    setCurrentTask("Initializing SEO analysis...")

    // Simulate optimization process
    const tasks = [
      "Crawling site pages...",
      "Analyzing keyword opportunities...",
      "Optimizing meta tags...",
      "Processing image alt text...",
      "Adding structured data...",
      "Checking internal links...",
      "Generating recommendations...",
    ]

    let taskIndex = 0
    const interval = setInterval(() => {
      if (taskIndex < tasks.length) {
        setCurrentTask(tasks[taskIndex])
        setProgress(((taskIndex + 1) / tasks.length) * 100)
        setLogs((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            message: tasks[taskIndex],
            type: "info",
          },
        ])
        taskIndex++
      } else {
        setStatus("completed")
        setCurrentTask("Optimization complete!")
        setLogs((prev) => [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            message: "SEO optimization completed successfully",
            type: "success",
          },
        ])
        clearInterval(interval)
      }
    }, 2000)
  }

  const handleApproveChange = (changeId: string) => {
    setChanges((prev) => prev.map((change) => (change.id === changeId ? { ...change, status: "approved" } : change)))
  }

  const handleRejectChange = (changeId: string) => {
    setChanges((prev) => prev.map((change) => (change.id === changeId ? { ...change, status: "rejected" } : change)))
  }

  const handlePreviewChange = (change: OptimizationChange) => {
    setSelectedChangeForPreview(change)
    setShowPreviewModal(true)
  }

  const handleEditChange = (changeId: string, newAfter: string) => {
    setChanges((prev) => prev.map((change) => (change.id === changeId ? { ...change, after: newAfter } : change)))
  }

  const handleBulkApprove = (changeIds: string[]) => {
    setChanges((prev) =>
      prev.map((change) => (changeIds.includes(change.id) ? { ...change, status: "approved" } : change)),
    )
  }

  const handleBulkReject = (changeIds: string[]) => {
    setChanges((prev) =>
      prev.map((change) => (changeIds.includes(change.id) ? { ...change, status: "rejected" } : change)),
    )
  }

  const handleFilterChange = (filters: any) => {
    // Filter logic would be implemented here
    console.log("Filters updated:", filters)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meta":
        return FileText
      case "image":
        return ImageIcon
      case "schema":
        return BarChart3
      case "link":
        return ImageIcon
      default:
        return Search
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-coral-orange-600 bg-coral-orange-50"
      case "medium":
        return "text-gold-600 bg-gold-50"
      case "low":
        return "text-turquoise-600 bg-turquoise-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-sand-beige-50">
      <header className="bg-white shadow-sm border-b border-sand-beige-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-navy-900 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-turquoise-500 p-2 rounded-lg">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-montserrat font-bold text-xl text-navy-900">SEO Agent</h1>
                  <p className="text-sm text-gray-600">AI-powered optimization for Caribbean kite safaris</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAutomationSettings(true)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-navy-900 transition-colors"
                title="Automation Settings"
              >
                <Clock className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-navy-900 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-sand-beige-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("optimization")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "optimization"
                  ? "border-turquoise-500 text-turquoise-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Optimization</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("reporting")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "reporting"
                  ? "border-turquoise-500 text-turquoise-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Reporting</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("rollback")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "rollback"
                  ? "border-turquoise-500 text-turquoise-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-4 w-4" />
                <span>Rollback</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "optimization" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
                <h2 className="font-montserrat font-semibold text-lg text-navy-900 mb-4">Optimization Control</h2>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-open-sans text-gray-600 mb-2">Target: Caribbean Kite Safari Antigua bookings</p>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          status === "running"
                            ? "bg-turquoise-500 animate-pulse"
                            : status === "completed"
                              ? "bg-green-500"
                              : status === "error"
                                ? "bg-red-500"
                                : "bg-gray-400"
                        }`}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">
                        {status === "idle"
                          ? "Ready to optimize"
                          : status === "running"
                            ? "Optimization in progress"
                            : status === "completed"
                              ? "Optimization completed"
                              : "Error occurred"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleStartOptimization}
                    disabled={status === "running"}
                    className="flex items-center space-x-2 bg-coral-orange-500 hover:bg-coral-orange-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    {status === "running" ? (
                      <>
                        <Pause className="h-5 w-5" />
                        <span>Running...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        <span>Activate SEO Optimization</span>
                      </>
                    )}
                  </button>
                </div>

                {status === "running" && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-turquoise-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{currentTask}</p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-montserrat font-semibold text-lg text-navy-900">
                    Proposed Changes ({changes.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowBulkPanel(!showBulkPanel)}
                      className="flex items-center space-x-2 text-turquoise-600 hover:text-turquoise-700 transition-colors text-sm"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Bulk Actions</span>
                    </button>
                    <button
                      onClick={() => setShowPreview(!showPreview)}
                      className="flex items-center space-x-2 text-turquoise-600 hover:text-turquoise-700 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">Preview All</span>
                    </button>
                  </div>
                </div>

                {showBulkPanel && (
                  <div className="mb-6">
                    <BulkApprovalPanel
                      changes={changes}
                      onBulkApprove={handleBulkApprove}
                      onBulkReject={handleBulkReject}
                      onFilterChange={handleFilterChange}
                    />
                  </div>
                )}

                <div className="space-y-3">
                  {changes.map((change) => {
                    const TypeIcon = getTypeIcon(change.type)
                    return (
                      <div key={change.id} className="border border-sand-beige-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <TypeIcon className="h-5 w-5 text-gray-600 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-navy-900">{change.page}</span>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(change.impact)}`}
                                >
                                  {change.impact} impact
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{change.description}</p>

                              {showPreview && (
                                <div className="bg-gray-50 rounded p-3 text-xs">
                                  <div className="mb-2">
                                    <span className="font-medium text-red-600">Before:</span>
                                    <div className="text-gray-700 mt-1">{change.before}</div>
                                  </div>
                                  <div>
                                    <span className="font-medium text-green-600">After:</span>
                                    <div className="text-gray-700 mt-1">{change.after}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handlePreviewChange(change)}
                              className="p-2 text-turquoise-600 hover:bg-turquoise-50 rounded transition-colors"
                              title="Detailed preview"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            {change.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleApproveChange(change.id)}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                                  title="Approve change"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectChange(change.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                  title="Reject change"
                                >
                                  <AlertCircle className="h-4 w-4" />
                                </button>
                              </>
                            )}
                            {change.status === "approved" && (
                              <span className="text-green-600 text-sm font-medium">Approved</span>
                            )}
                            {change.status === "rejected" && (
                              <span className="text-red-600 text-sm font-medium">Rejected</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
                <h3 className="font-montserrat font-semibold text-lg text-navy-900 mb-4">SEO Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current SEO Score</span>
                    <span className="font-bold text-turquoise-600">85/100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pages Optimized</span>
                    <span className="font-bold text-navy-900">23/23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Keywords Targeted</span>
                    <span className="font-bold text-coral-orange-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Optimization</span>
                    <span className="font-bold text-gray-700">2 hours ago</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
                <h3 className="font-montserrat font-semibold text-lg text-navy-900 mb-4">Activity Log</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {logs.map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm">
                      <span className="text-gray-400 font-mono">{log.time}</span>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            log.type === "success"
                              ? "bg-green-500"
                              : log.type === "error"
                                ? "bg-red-500"
                                : "bg-turquoise-500"
                          }`}
                        ></div>
                        <span className="text-gray-700">{log.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-sand-beige-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-montserrat font-semibold text-lg text-navy-900">Automation Status</h3>
                  <button
                    onClick={() => setShowAutomationSettings(true)}
                    className="text-turquoise-600 hover:text-turquoise-700 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Weekly Auto-Audit</span>
                      <p className="text-xs text-gray-500">Next: Monday 2:00 AM</p>
                    </div>
                    <span className="bg-turquoise-500 text-white px-3 py-1 rounded text-sm">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Auto-Approve Rules</span>
                      <p className="text-xs text-gray-500">2 rules configured</p>
                    </div>
                    <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm">Disabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Notifications</span>
                      <p className="text-xs text-gray-500">In-app enabled</p>
                    </div>
                    <Bell className="h-4 w-4 text-turquoise-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reporting" && <SEOReportingDashboard />}

        {activeTab === "rollback" && <RollbackManager />}
      </main>

      <ChangePreviewModal
        change={selectedChangeForPreview}
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        onApprove={handleApproveChange}
        onReject={handleRejectChange}
        onEdit={handleEditChange}
      />

      {showAutomationSettings && <AutomationSettings onClose={() => setShowAutomationSettings(false)} />}
    </div>
  )
}
