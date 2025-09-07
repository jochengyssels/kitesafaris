"use client"

import { useState } from "react"
import Link from "next/link"
import type { OptimizationChange } from "@/lib/seo-optimization-service"
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
  Plus,
  X,
  Filter,
  Globe,
  BookOpen,
  ShoppingBag,
  Users,
  MapPin,
  Calendar,
  Star,
} from "lucide-react"
import { ChangePreviewModal } from "./change-preview-modal"
import { BulkApprovalPanel } from "./bulk-approval-panel"
import { AutomationSettings } from "./automation-settings"
import { SEOReportingDashboard } from "./seo-reporting-dashboard"
import { RollbackManager } from "./rollback-manager"

type OptimizationStatus = "idle" | "running" | "completed" | "error"
type ChangeStatus = "pending" | "approved" | "rejected"
type DashboardTab = "optimization" | "reporting" | "rollback"

interface SEOPage {
  path: string
  title: string
  category: string
  priority: "high" | "medium" | "low"
  lastOptimized?: string
  seoScore?: number
  icon: any
}

interface KeywordPreset {
  name: string
  keywords: string[]
  description: string
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
  const [customKeywords, setCustomKeywords] = useState<string>("")
  const [showKeywordInput, setShowKeywordInput] = useState(false)
  const [selectedPages, setSelectedPages] = useState<string[]>([])
  const [showPageSelector, setShowPageSelector] = useState(false)
  const [selectedKeywordPreset, setSelectedKeywordPreset] = useState<string>("")
  const [showKeywordPresets, setShowKeywordPresets] = useState(false)

  const [changes, setChanges] = useState<OptimizationChange[]>([
    {
      id: "1",
      type: "meta",
      page: "/destinations/antigua",
      currentValue: "Antigua Destination - KiteSafaris",
      suggestedValue: "Caribbean Kite Safari Antigua | 7-Day Luxury Catamaran Trip | KiteSafaris",
      priority: "high",
      status: "pending",
      impact: "high",
      description: 'Updated meta title to target "Caribbean Kite Safari Antigua"',
      before: "Antigua Destination - KiteSafaris",
      after: "Caribbean Kite Safari Antigua | 7-Day Luxury Catamaran Trip | KiteSafaris",
    },
    {
      id: "2",
      type: "image",
      page: "/packages",
      currentValue: "Catamaran sailing",
      suggestedValue: "Luxury catamaran Caribbean kite safari Antigua kiteboarding adventure",
      priority: "medium",
      status: "pending",
      impact: "medium",
      description: "Optimized alt text for hero image with target keywords",
      before: "Catamaran sailing",
      after: "Luxury catamaran Caribbean kite safari Antigua kiteboarding adventure",
    },
    {
      id: "3",
      type: "schema",
      page: "/booking",
      currentValue: "No structured data",
      suggestedValue: "JSON-LD schema for TravelEvent and BookingAction",
      priority: "high",
      status: "pending",
      impact: "high",
      description: "Added structured data for booking actions and travel events",
      before: "No structured data",
      after: "JSON-LD schema for TravelEvent and BookingAction",
    },
  ])

  // Available pages for SEO optimization
  const availablePages: SEOPage[] = [
    // Main pages
    { path: "/", title: "Home", category: "Main", priority: "high", seoScore: 85, icon: Globe },
    { path: "/destinations", title: "Destinations", category: "Main", priority: "high", seoScore: 78, icon: MapPin },
    { path: "/packages", title: "Packages", category: "Main", priority: "high", seoScore: 82, icon: Calendar },
    { path: "/booking", title: "Booking", category: "Main", priority: "high", seoScore: 75, icon: CheckCircle },
    { path: "/contact", title: "Contact", category: "Main", priority: "medium", seoScore: 88, icon: Users },
    
    // Destination pages
    { path: "/destinations/antigua", title: "Antigua", category: "Destinations", priority: "high", seoScore: 72, icon: MapPin },
    { path: "/destinations/barbados", title: "Barbados", category: "Destinations", priority: "high", seoScore: 68, icon: MapPin },
    { path: "/destinations/sardinia", title: "Sardinia", category: "Destinations", priority: "high", seoScore: 74, icon: MapPin },
    { path: "/destinations/croatia", title: "Croatia", category: "Destinations", priority: "medium", seoScore: 71, icon: MapPin },
    { path: "/destinations/greece", title: "Greece", category: "Destinations", priority: "medium", seoScore: 69, icon: MapPin },
    { path: "/destinations/dominican-republic", title: "Dominican Republic", category: "Destinations", priority: "medium", seoScore: 66, icon: MapPin },
    { path: "/destinations/tobago", title: "Tobago", category: "Destinations", priority: "medium", seoScore: 64, icon: MapPin },
    { path: "/destinations/turks-and-caicos", title: "Turks and Caicos", category: "Destinations", priority: "medium", seoScore: 67, icon: MapPin },
    
    // Blog pages
    { path: "/blog", title: "Blog", category: "Content", priority: "medium", seoScore: 80, icon: BookOpen },
    { path: "/blog/mediterranean-vs-caribbean-kiteboarding", title: "Mediterranean vs Caribbean", category: "Content", priority: "high", seoScore: 76, icon: BookOpen },
    { path: "/blog/caribbean-kiteboarding-wind-patterns", title: "Wind Patterns", category: "Content", priority: "high", seoScore: 73, icon: BookOpen },
    { path: "/blog/packing-checklist-kite-safari", title: "Packing Checklist", category: "Content", priority: "medium", seoScore: 79, icon: BookOpen },
    { path: "/blog/kiteboarding-safety-tips-tropical-destinations", title: "Safety Tips", category: "Content", priority: "medium", seoScore: 77, icon: BookOpen },
    
    // Service pages
    { path: "/fleet", title: "Fleet", category: "Services", priority: "medium", seoScore: 81, icon: ShoppingBag },
    { path: "/guides", title: "Guides", category: "Services", priority: "medium", seoScore: 83, icon: Users },
    { path: "/premium-equipment", title: "Premium Equipment", category: "Services", priority: "medium", seoScore: 85, icon: Star },
    { path: "/guaranteed-wind", title: "Guaranteed Wind", category: "Services", priority: "high", seoScore: 78, icon: TrendingUp },
    { path: "/small-groups", title: "Small Groups", category: "Services", priority: "medium", seoScore: 80, icon: Users },
    
    // Trip pages
    { path: "/antigua-kite-safari-december-6-2025", title: "Antigua Dec 2025", category: "Trips", priority: "high", seoScore: 70, icon: Calendar },
    { path: "/antigua-kite-safari-january-2026", title: "Antigua Jan 2026", category: "Trips", priority: "high", seoScore: 68, icon: Calendar },
    { path: "/antigua-kite-safari-february-2026", title: "Antigua Feb 2026", category: "Trips", priority: "high", seoScore: 69, icon: Calendar },
    
    // Other pages
    { path: "/shop", title: "Shop", category: "E-commerce", priority: "medium", seoScore: 84, icon: ShoppingBag },
    { path: "/reviews", title: "Reviews", category: "Social Proof", priority: "medium", seoScore: 86, icon: Star },
    { path: "/faq", title: "FAQ", category: "Support", priority: "medium", seoScore: 89, icon: FileText },
    { path: "/why-us", title: "Why Us", category: "About", priority: "medium", seoScore: 87, icon: Star },
  ]

  // Keyword presets for different optimization strategies
  const keywordPresets: KeywordPreset[] = [
    {
      name: "Caribbean Focus",
      keywords: ["caribbean kite safari", "antigua kiteboarding", "catamaran kite safari", "caribbean kite cruise", "luxury kite safari"],
      description: "Optimize for Caribbean kite safari bookings"
    },
    {
      name: "Mediterranean Focus", 
      keywords: ["sardinia kiteboarding", "mediterranean kite safari", "italy kite cruise", "sardinia kite spots", "mediterranean wind"],
      description: "Target Mediterranean kite destinations"
    },
    {
      name: "Beginner Friendly",
      keywords: ["beginner kite safari", "learn kiteboarding", "kite lessons caribbean", "safe kite spots", "kiteboarding for beginners"],
      description: "Attract beginner kiteboarders"
    },
    {
      name: "Luxury Travel",
      keywords: ["luxury kite safari", "premium catamaran", "exclusive kite trip", "high-end kiteboarding", "luxury water sports"],
      description: "Target luxury travel market"
    },
    {
      name: "Group Travel",
      keywords: ["group kite safari", "corporate kite trip", "team building kiteboarding", "group water sports", "kite safari friends"],
      description: "Focus on group bookings"
    },
    {
      name: "Custom",
      keywords: [],
      description: "Define your own keywords"
    }
  ]

  const [logs, setLogs] = useState([
    { time: "14:32:15", message: "SEO Agent initialized", type: "info" },
    { time: "14:32:16", message: "Starting site crawl...", type: "info" },
    { time: "14:32:18", message: "Found 23 pages to analyze", type: "success" },
    { time: "14:32:20", message: "Analyzing Caribbean kite safari keywords...", type: "info" },
  ])

  // Helper functions for page selection
  const handlePageToggle = (pagePath: string) => {
    setSelectedPages(prev => 
      prev.includes(pagePath) 
        ? prev.filter(p => p !== pagePath)
        : [...prev, pagePath]
    )
  }

  const handleSelectAllPages = () => {
    setSelectedPages(availablePages.map(page => page.path))
  }

  const handleDeselectAllPages = () => {
    setSelectedPages([])
  }

  const handleSelectByCategory = (category: string) => {
    const categoryPages = availablePages
      .filter(page => page.category === category)
      .map(page => page.path)
    setSelectedPages(prev => [...new Set([...prev, ...categoryPages])])
  }

  const handleSelectByPriority = (priority: "high" | "medium" | "low") => {
    const priorityPages = availablePages
      .filter(page => page.priority === priority)
      .map(page => page.path)
    setSelectedPages(prev => [...new Set([...prev, ...priorityPages])])
  }

  // Helper functions for keyword management
  const handleKeywordPresetSelect = (presetName: string) => {
    setSelectedKeywordPreset(presetName)
    const preset = keywordPresets.find(p => p.name === presetName)
    if (preset && preset.keywords.length > 0) {
      setCustomKeywords(preset.keywords.join(", "))
    } else if (presetName === "Custom") {
      setCustomKeywords("")
    }
  }

  const getCurrentKeywords = () => {
    if (selectedKeywordPreset && selectedKeywordPreset !== "Custom") {
      const preset = keywordPresets.find(p => p.name === selectedKeywordPreset)
      return preset ? preset.keywords : []
    }
    return customKeywords ? customKeywords.split(',').map(k => k.trim()).filter(k => k.length > 0) : []
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getSEOScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const handleStartOptimization = async () => {
    setStatus("running")
    setProgress(0)
    setCurrentTask("Initializing SEO analysis...")

    try {
      // Step 1: Analyze pages
      setCurrentTask("Analyzing site pages...")
      setProgress(20)
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          message: "Starting SEO analysis...",
          type: "info",
        },
      ])

      const analysisResponse = await fetch('/api/seo-agent/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pages: selectedPages.length > 0 ? selectedPages : ['/contact', '/destinations', '/packages', '/booking'],
          keywords: getCurrentKeywords(),
          customKeywords: getCurrentKeywords()
        }),
      })

      if (!analysisResponse.ok) {
        throw new Error('Analysis failed')
      }

      const analysisData = await analysisResponse.json()
      
      setProgress(40)
      setCurrentTask("Processing optimization opportunities...")
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          message: `Found ${analysisData.data.optimizationOpportunities.length} optimization opportunities`,
          type: "success",
        },
      ])

      // Update changes with real data
      const realChanges = analysisData.data.optimizationOpportunities.map((opp: any) => ({
        id: opp.id,
        type: opp.type,
        page: opp.page,
        description: opp.description,
        before: opp.currentValue,
        after: opp.suggestedValue,
        status: "pending" as ChangeStatus,
        impact: opp.priority === "high" ? "high" as const : opp.priority === "medium" ? "medium" as const : "low" as const,
      }))

      setChanges(realChanges)
      setProgress(60)
      setCurrentTask("SEO analysis complete!")
      
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          message: `SEO analysis completed - Score: ${analysisData.data.score}/100`,
          type: "success",
        },
      ])

      setStatus("completed")
      setProgress(100)
      setCurrentTask("Ready to apply optimizations")

    } catch (error) {
      console.error('SEO optimization error:', error)
      setStatus("error")
      setCurrentTask("Analysis failed")
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          type: "error",
        },
      ])
    }
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

  const handleApplyApprovedChanges = async () => {
    const approvedChanges = changes.filter(change => change.status === "approved")
    
    if (approvedChanges.length === 0) {
      alert("No approved changes to apply")
      return
    }

    setStatus("running")
    setCurrentTask("Applying approved changes...")
    setProgress(0)

    try {
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          message: `Applying ${approvedChanges.length} approved changes...`,
          type: "info",
        },
      ])

      const optimizeResponse = await fetch('/api/seo-agent/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          changes: approvedChanges
        }),
      })

      if (!optimizeResponse.ok) {
        throw new Error('Optimization failed')
      }

      const optimizeData = await optimizeResponse.json()
      
      setProgress(100)
      setStatus("completed")
      setCurrentTask("Changes applied successfully!")
      
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          message: `Successfully applied ${optimizeData.data.appliedChanges} changes`,
          type: "success",
        },
      ])

      // Update change statuses
      setChanges((prev) => 
        prev.map((change) => {
          const result = optimizeData.data.results.find((r: any) => r.id === change.id)
          if (result && result.status === "completed") {
            return { ...change, status: "completed" as ChangeStatus }
          }
          return change
        })
      )

    } catch (error) {
      console.error('Apply changes error:', error)
      setStatus("error")
      setCurrentTask("Failed to apply changes")
      setLogs((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          type: "error",
        },
      ])
    }
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
                <h2 className="font-montserrat font-semibold text-lg text-navy-900 mb-4">SEO Optimization Setup</h2>

                {/* Page Selection Section */}
                <div className="mb-6 p-4 bg-sand-beige-50 rounded-lg border border-sand-beige-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-navy-900">Select Pages to Optimize</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowPageSelector(!showPageSelector)}
                        className="text-turquoise-600 hover:text-turquoise-700 text-sm font-medium"
                      >
                        {showPageSelector ? 'Hide' : 'Select Pages'}
                      </button>
                      {selectedPages.length > 0 && (
                        <span className="text-xs bg-turquoise-100 text-turquoise-700 px-2 py-1 rounded">
                          {selectedPages.length} selected
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {showPageSelector ? (
                    <div className="space-y-4">
                      {/* Quick Selection Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={handleSelectAllPages}
                          className="px-3 py-1 bg-turquoise-100 text-turquoise-700 rounded text-sm hover:bg-turquoise-200"
                        >
                          Select All
                        </button>
                        <button
                          onClick={handleDeselectAllPages}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
                        >
                          Deselect All
                        </button>
                        <button
                          onClick={() => handleSelectByPriority("high")}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                        >
                          High Priority
                        </button>
                        <button
                          onClick={() => handleSelectByPriority("medium")}
                          className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm hover:bg-yellow-200"
                        >
                          Medium Priority
                        </button>
                      </div>

                      {/* Category Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select by Category:</label>
                        <div className="flex flex-wrap gap-2">
                          {Array.from(new Set(availablePages.map(p => p.category))).map(category => (
                            <button
                              key={category}
                              onClick={() => handleSelectByCategory(category)}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Page List */}
                      <div className="max-h-64 overflow-y-auto border border-sand-beige-300 rounded-lg">
                        {availablePages.map((page) => {
                          const IconComponent = page.icon
                          const isSelected = selectedPages.includes(page.path)
                          return (
                            <div
                              key={page.path}
                              className={`flex items-center justify-between p-3 border-b border-sand-beige-200 last:border-b-0 hover:bg-sand-beige-50 ${
                                isSelected ? 'bg-turquoise-50' : ''
                              }`}
                            >
                              <div className="flex items-center space-x-3 flex-1">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handlePageToggle(page.path)}
                                  className="h-4 w-4 text-turquoise-600 focus:ring-turquoise-500 border-gray-300 rounded"
                                />
                                <IconComponent className="h-4 w-4 text-gray-600" />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-navy-900">{page.title}</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(page.priority)}`}>
                                      {page.priority}
                                    </span>
                                    <span className={`text-xs font-medium ${getSEOScoreColor(page.seoScore || 0)}`}>
                                      SEO: {page.seoScore}/100
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500">{page.path}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600">
                      <p className="mb-1">
                        <span className="font-medium">Selected pages:</span> {selectedPages.length > 0 ? `${selectedPages.length} pages selected` : 'No pages selected (will use default pages)'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Click "Select Pages" to choose specific pages for SEO optimization.
                      </p>
                    </div>
                  )}
                </div>

                {/* Keyword Management Section */}
                <div className="mb-6 p-4 bg-sand-beige-50 rounded-lg border border-sand-beige-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-navy-900">SEO Keywords</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setShowKeywordPresets(!showKeywordPresets)}
                        className="text-turquoise-600 hover:text-turquoise-700 text-sm font-medium"
                      >
                        {showKeywordPresets ? 'Hide Presets' : 'Keyword Presets'}
                      </button>
                      <button
                        onClick={() => setShowKeywordInput(!showKeywordInput)}
                        className="text-turquoise-600 hover:text-turquoise-700 text-sm font-medium"
                      >
                        {showKeywordInput ? 'Hide Custom' : 'Custom Keywords'}
                      </button>
                    </div>
                  </div>
                  
                  {showKeywordPresets && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Choose Keyword Strategy:</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {keywordPresets.map((preset) => (
                          <button
                            key={preset.name}
                            onClick={() => handleKeywordPresetSelect(preset.name)}
                            className={`p-3 text-left rounded-lg border transition-colors ${
                              selectedKeywordPreset === preset.name
                                ? 'border-turquoise-500 bg-turquoise-50'
                                : 'border-sand-beige-300 hover:border-turquoise-300'
                            }`}
                          >
                            <div className="font-medium text-navy-900">{preset.name}</div>
                            <div className="text-xs text-gray-600 mt-1">{preset.description}</div>
                            {preset.keywords.length > 0 && (
                              <div className="text-xs text-turquoise-600 mt-1">
                                {preset.keywords.slice(0, 2).join(", ")}
                                {preset.keywords.length > 2 && ` +${preset.keywords.length - 2} more`}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {showKeywordInput && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Keywords (comma-separated)
                        </label>
                        <textarea
                          value={customKeywords}
                          onChange={(e) => setCustomKeywords(e.target.value)}
                          placeholder="e.g., kite safari antigua, caribbean kiteboarding, luxury catamaran trip"
                          className="w-full p-3 border border-sand-beige-300 rounded-lg text-sm focus:ring-2 focus:ring-turquoise-500 focus:border-turquoise-500"
                          rows={3}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Enter your target keywords separated by commas. These will be used for SEO optimization.
                        </p>
                      </div>
                    </div>
                  )}

                  {!showKeywordInput && !showKeywordPresets && (
                    <div className="text-sm text-gray-600">
                      <p className="mb-1">
                        <span className="font-medium">Current strategy:</span> {selectedKeywordPreset || 'No preset selected'}
                      </p>
                      <p className="mb-1">
                        <span className="font-medium">Keywords:</span> {getCurrentKeywords().length > 0 ? getCurrentKeywords().join(", ") : 'No keywords set'}
                      </p>
                      <p className="text-xs text-gray-500">
                        Use "Keyword Presets" for predefined strategies or "Custom Keywords" to define your own.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-open-sans text-gray-600 mb-2">
                      Target: {selectedPages.length > 0 ? `${selectedPages.length} selected pages` : 'Default pages'} • {getCurrentKeywords().length > 0 ? `${getCurrentKeywords().length} keywords` : 'Default keywords'}
                    </p>
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

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleStartOptimization}
                      disabled={status === "running"}
                      className="bg-coral-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-coral-orange/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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
                    
                    {changes.some(change => change.status === "approved") && (
                      <button
                        onClick={handleApplyApprovedChanges}
                        disabled={status === "running"}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-500/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span>Apply Approved Changes</span>
                      </button>
                    )}
                  </div>
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
