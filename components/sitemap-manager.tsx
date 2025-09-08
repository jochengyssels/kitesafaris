"use client"

import { useState, useEffect } from "react"
import { 
  RefreshCw, 
  Search, 
  Download, 
  FileText, 
  MapPin, 
  Anchor, 
  ShoppingBag, 
  BookOpen, 
  Plane, 
  Trophy, 
  Shield, 
  Settings, 
  Zap, 
  Smartphone,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Lock,
  GitBranch,
  Wrench,
  Loader2
} from "lucide-react"
import { toast } from "sonner"

interface SitemapPage {
  path: string
  fileLocation: string
  title?: string
  description?: string
  status: "active" | "missing" | "protected"
  lastModified?: string
  fileSize?: string
  category: string
  isDynamic?: boolean
  dynamicParams?: string[]
}

interface SitemapCategory {
  name: string
  icon: React.ReactNode
  color: string
  pages: SitemapPage[]
}

interface SitemapData {
  categories: SitemapCategory[]
  lastUpdated: string
  totalPages: number
  orphanedPages: SitemapPage[]
  seoIssues: {
    missingTitles: string[]
    missingDescriptions: string[]
    brokenLinks: string[]
  }
}

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "🏠 Main Pages": <MapPin className="w-5 h-5" />,
  "🗺️ Destinations": <MapPin className="w-5 h-5" />,
  "⛵ Fleet & Booking": <Anchor className="w-5 h-5" />,
  "🛍️ Shop & E-commerce": <ShoppingBag className="w-5 h-5" />,
  "📚 Guides & Content": <BookOpen className="w-5 h-5" />,
  "✈️ Travel & Flights": <Plane className="w-5 h-5" />,
  "🏆 About & Information": <Trophy className="w-5 h-5" />,
  "📋 Policies & Legal": <Shield className="w-5 h-5" />,
  "🔧 Admin & Management": <Settings className="w-5 h-5" />,
  "🔌 API Routes": <Zap className="w-5 h-5" />,
  "📱 Special Features": <Smartphone className="w-5 h-5" />,
}

export function SitemapManager() {
  const [sitemapData, setSitemapData] = useState<SitemapData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [filteredData, setFilteredData] = useState<SitemapData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fixingIssues, setFixingIssues] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchSitemapData()
  }, [])

  useEffect(() => {
    if (sitemapData) {
      filterSitemapData()
    }
  }, [searchQuery, sitemapData])

  const fetchSitemapData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/sitemap", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache" // Force fresh data
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setSitemapData(data)
      // Expand all categories by default
      setExpandedCategories(new Set(data.categories.map((cat: SitemapCategory) => cat.name)))
      toast.success("Sitemap data refreshed successfully")
    } catch (error) {
      console.error("Error fetching sitemap data:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch sitemap data"
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const filterSitemapData = () => {
    if (!sitemapData) return

    if (!searchQuery.trim()) {
      setFilteredData(sitemapData)
      return
    }

    const query = searchQuery.toLowerCase()
    const filteredCategories = sitemapData.categories.map(category => ({
      ...category,
      pages: category.pages.filter(page => 
        page.path.toLowerCase().includes(query) ||
        page.title?.toLowerCase().includes(query) ||
        page.description?.toLowerCase().includes(query) ||
        page.fileLocation.toLowerCase().includes(query)
      )
    })).filter(category => category.pages.length > 0)

    setFilteredData({
      ...sitemapData,
      categories: filteredCategories,
      totalPages: filteredCategories.reduce((sum, cat) => sum + cat.pages.length, 0)
    })
  }

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName)
    } else {
      newExpanded.add(categoryName)
    }
    setExpandedCategories(newExpanded)
  }

  const exportSitemap = (format: "xml" | "json") => {
    if (!sitemapData) return

    if (format === "json") {
      const dataStr = JSON.stringify(sitemapData, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "kitesafaris-sitemap.json"
      link.click()
      URL.revokeObjectURL(url)
    } else {
      // Generate XML sitemap
      const xmlContent = generateXMLSitemap(sitemapData)
      const dataBlob = new Blob([xmlContent], { type: "application/xml" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "kitesafaris-sitemap.xml"
      link.click()
      URL.revokeObjectURL(url)
    }
    
    toast.success(`Sitemap exported as ${format.toUpperCase()}`)
  }

  const downloadSitemap = async (sitemapType: string) => {
    try {
      const response = await fetch(`/${sitemapType}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch ${sitemapType}`)
      }
      
      const xmlContent = await response.text()
      const dataBlob = new Blob([xmlContent], { type: "application/xml" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${sitemapType}`
      link.click()
      URL.revokeObjectURL(url)
      
      toast.success(`${sitemapType} downloaded successfully`)
    } catch (error) {
      console.error(`Error downloading ${sitemapType}:`, error)
      toast.error(`Failed to download ${sitemapType}`)
    }
  }

  const downloadAllSitemaps = async () => {
    try {
      const sitemapTypes = [
        "sitemap.xml",
        "sitemap-index.xml", 
        "sitemap-images.xml",
        "sitemap-mobile.xml",
        "sitemap-news.xml",
        "sitemap-video.xml"
      ]
      
      const sitemapPromises = sitemapTypes.map(async (sitemapType) => {
        const response = await fetch(`/${sitemapType}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch ${sitemapType}`)
        }
        const content = await response.text()
        return { name: sitemapType, content }
      })
      
      const sitemaps = await Promise.all(sitemapPromises)
      
      // Create a simple zip-like structure using JSZip (we'll need to add this dependency)
      // For now, let's create individual downloads with a delay
      for (let i = 0; i < sitemaps.length; i++) {
        const sitemap = sitemaps[i]
        const dataBlob = new Blob([sitemap.content], { type: "application/xml" })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement("a")
        link.href = url
        link.download = sitemap.name
        link.click()
        URL.revokeObjectURL(url)
        
        // Small delay between downloads to avoid browser blocking
        if (i < sitemaps.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }
      
      toast.success("All sitemaps downloaded successfully")
    } catch (error) {
      console.error("Error downloading all sitemaps:", error)
      toast.error("Failed to download all sitemaps")
    }
  }

  const generateXMLSitemap = (data: SitemapData): string => {
    const urls = data.categories.flatMap(cat => 
      cat.pages.map(page => ({
        loc: `https://kitesafaris.com${page.path}`,
        lastmod: page.lastModified || new Date().toISOString().split('T')[0],
        changefreq: "weekly",
        priority: page.path === "/" ? "1.0" : "0.8"
      }))
    )

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`
  }

  const fixSEOIssue = async (issueType: "missingTitle" | "missingDescription", pagePath: string, fileLocation: string) => {
    const issueKey = `${issueType}-${pagePath}`
    setFixingIssues(prev => new Set([...prev, issueKey]))
    
    try {
      const response = await fetch("/api/admin/sitemap/fix-seo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issueType,
          pagePath,
          fileLocation,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(`Successfully fixed ${issueType} for ${pagePath}`)
        // Refresh sitemap data to show updated content
        await fetchSitemapData()
      } else {
        toast.error(`Failed to fix ${issueType}: ${result.error}`)
      }
    } catch (error) {
      console.error("Error fixing SEO issue:", error)
      toast.error(`Error fixing ${issueType}: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setFixingIssues(prev => {
        const newSet = new Set(prev)
        newSet.delete(issueKey)
        return newSet
      })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "missing":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "protected":
        return <Lock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "missing":
        return "Missing"
      case "protected":
        return "Protected"
      default:
        return "Unknown"
    }
  }

  // Error state
  if (error && !isLoading) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-deep-navy mb-2">Error Loading Sitemap</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchSitemapData}
          className="px-4 py-2 bg-deep-navy text-white rounded-lg hover:bg-deep-navy/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  // Loading state
  if (isLoading && !sitemapData) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-8 h-8 animate-spin text-turquoise-500 mx-auto mb-4" />
        <p className="text-gray-600">Loading sitemap data...</p>
      </div>
    )
  }

  // No data state
  if (!filteredData && !isLoading) {
    return (
      <div className="text-center py-12">
        <GitBranch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-deep-navy mb-2">No Sitemap Data</h3>
        <p className="text-gray-600 mb-4">Click the refresh button to generate sitemap data</p>
        <button
          onClick={fetchSitemapData}
          className="px-4 py-2 bg-deep-navy text-white rounded-lg hover:bg-deep-navy/90 transition-colors"
        >
          Generate Sitemap
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-deep-navy font-montserrat">Sitemap Management</h1>
            <p className="text-gray-600 mt-2">
              Manage and monitor the complete KiteSafaris.com site structure
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => exportSitemap("json")}
              className="flex items-center gap-2 px-4 py-2 bg-turquoise-500 text-white rounded-lg hover:bg-turquoise-600 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>
            <button
              onClick={() => exportSitemap("xml")}
              className="flex items-center gap-2 px-4 py-2 bg-coral-orange-500 text-white rounded-lg hover:bg-coral-orange-600 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Export XML
            </button>
            <button
              onClick={fetchSitemapData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-deep-navy text-white rounded-lg hover:bg-deep-navy/90 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              {isLoading ? "Refreshing..." : "Refresh Sitemap"}
            </button>
          </div>
        </div>
        
        {sitemapData && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Last Updated:</span>
                <span className="ml-2 font-medium">{new Date(sitemapData.lastUpdated).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-600">Total Pages:</span>
                <span className="ml-2 font-medium">{sitemapData.totalPages}</span>
              </div>
              <div>
                <span className="text-gray-600">Categories:</span>
                <span className="ml-2 font-medium">{sitemapData.categories.length}</span>
              </div>
              <div>
                <span className="text-gray-600">Orphaned Pages:</span>
                <span className="ml-2 font-medium">{sitemapData.orphanedPages.length}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sitemap Downloads */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-deep-navy mb-4">Download Sitemaps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => downloadSitemap("sitemap.xml")}
            className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Main Sitemap</span>
          </button>
          <button
            onClick={() => downloadSitemap("sitemap-index.xml")}
            className="flex items-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Sitemap Index</span>
          </button>
          <button
            onClick={() => downloadSitemap("sitemap-images.xml")}
            className="flex items-center gap-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors border border-purple-200"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Images Sitemap</span>
          </button>
          <button
            onClick={() => downloadSitemap("sitemap-mobile.xml")}
            className="flex items-center gap-2 px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors border border-orange-200"
          >
            <Smartphone className="w-4 h-4" />
            <span className="text-sm font-medium">Mobile Sitemap</span>
          </button>
          <button
            onClick={() => downloadSitemap("sitemap-news.xml")}
            className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">News Sitemap</span>
          </button>
          <button
            onClick={() => downloadSitemap("sitemap-video.xml")}
            className="flex items-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Video Sitemap</span>
          </button>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={downloadAllSitemaps}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-deep-navy to-turquoise-500 text-white rounded-lg hover:from-deep-navy/90 hover:to-turquoise-600 transition-all shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span className="font-medium">Download All Sitemaps</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search pages, titles, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-turquoise focus:border-transparent"
          />
        </div>
      </div>

      {/* Sitemap Categories */}
      {filteredData && (
        <div className="space-y-4">
          {filteredData.categories.map((category) => (
            <div key={category.name} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      {categoryIcons[category.name] || <GitBranch className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-deep-navy">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.pages.length} pages</p>
                    </div>
                  </div>
                  {expandedCategories.has(category.name) ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              {expandedCategories.has(category.name) && (
                <div className="border-t border-gray-100">
                  <div className="p-6 space-y-3">
                    {category.pages.map((page) => (
                      <div key={page.path} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-sm text-gray-600">{page.path}</span>
                            {page.isDynamic && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Dynamic
                              </span>
                            )}
                            <div className="flex items-center gap-1">
                              {getStatusIcon(page.status)}
                              <span className="text-xs text-gray-600">{getStatusText(page.status)}</span>
                            </div>
                          </div>
                          
                          {page.title && (
                            <h4 className="font-medium text-deep-navy mb-1">{page.title}</h4>
                          )}
                          
                          {page.description && (
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{page.description}</p>
                          )}
                          
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>📁 {page.fileLocation}</span>
                            {page.lastModified && (
                              <span>📅 {new Date(page.lastModified).toLocaleDateString()}</span>
                            )}
                            {page.fileSize && (
                              <span>💾 {page.fileSize}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <a
                            href={page.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-turquoise-500 transition-colors"
                            title="Open page in new tab"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* SEO Issues Summary */}
      {filteredData && filteredData.seoIssues && (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-deep-navy mb-4">SEO Issues</h3>
          
          {/* Missing Titles */}
          {filteredData.seoIssues.missingTitles.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Missing Titles ({filteredData.seoIssues.missingTitles.length} pages)
                </h4>
                <button
                  onClick={() => {
                    // Fix all missing titles
                    filteredData.seoIssues.missingTitles.forEach(pagePath => {
                      const page = filteredData.categories
                        .flatMap(cat => cat.pages)
                        .find(p => p.path === pagePath)
                      if (page) {
                        fixSEOIssue("missingTitle", pagePath, page.fileLocation)
                      }
                    })
                  }}
                  disabled={fixingIssues.size > 0}
                  className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 text-sm"
                >
                  {fixingIssues.size > 0 ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wrench className="w-4 h-4" />
                  )}
                  Fix All Titles
                </button>
              </div>
              <div className="space-y-2">
                {filteredData.seoIssues.missingTitles.map((pagePath) => {
                  const page = filteredData.categories
                    .flatMap(cat => cat.pages)
                    .find(p => p.path === pagePath)
                  const issueKey = `missingTitle-${pagePath}`
                  const isFixing = fixingIssues.has(issueKey)
                  
                  return (
                    <div key={pagePath} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div className="flex-1">
                        <span className="font-mono text-sm text-red-700">{pagePath}</span>
                        {page && (
                          <span className="text-xs text-red-600 ml-2">📁 {page.fileLocation}</span>
                        )}
                      </div>
                      <button
                        onClick={() => page && fixSEOIssue("missingTitle", pagePath, page.fileLocation)}
                        disabled={isFixing}
                        className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors disabled:opacity-50 text-xs"
                      >
                        {isFixing ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Wrench className="w-3 h-3" />
                        )}
                        Fix
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Missing Descriptions */}
          {filteredData.seoIssues.missingDescriptions.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-yellow-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Missing Descriptions ({filteredData.seoIssues.missingDescriptions.length} pages)
                </h4>
                <button
                  onClick={() => {
                    // Fix all missing descriptions
                    filteredData.seoIssues.missingDescriptions.forEach(pagePath => {
                      const page = filteredData.categories
                        .flatMap(cat => cat.pages)
                        .find(p => p.path === pagePath)
                      if (page) {
                        fixSEOIssue("missingDescription", pagePath, page.fileLocation)
                      }
                    })
                  }}
                  disabled={fixingIssues.size > 0}
                  className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors disabled:opacity-50 text-sm"
                >
                  {fixingIssues.size > 0 ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wrench className="w-4 h-4" />
                  )}
                  Fix All Descriptions
                </button>
              </div>
              <div className="space-y-2">
                {filteredData.seoIssues.missingDescriptions.map((pagePath) => {
                  const page = filteredData.categories
                    .flatMap(cat => cat.pages)
                    .find(p => p.path === pagePath)
                  const issueKey = `missingDescription-${pagePath}`
                  const isFixing = fixingIssues.has(issueKey)
                  
                  return (
                    <div key={pagePath} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex-1">
                        <span className="font-mono text-sm text-yellow-700">{pagePath}</span>
                        {page && (
                          <span className="text-xs text-yellow-600 ml-2">📁 {page.fileLocation}</span>
                        )}
                      </div>
                      <button
                        onClick={() => page && fixSEOIssue("missingDescription", pagePath, page.fileLocation)}
                        disabled={isFixing}
                        className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors disabled:opacity-50 text-xs"
                      >
                        {isFixing ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Wrench className="w-3 h-3" />
                        )}
                        Fix
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Broken Links */}
          {filteredData.seoIssues.brokenLinks.length > 0 && (
            <div>
              <h4 className="font-medium text-orange-800 flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5" />
                Broken Links ({filteredData.seoIssues.brokenLinks.length} issues)
              </h4>
              <div className="space-y-2">
                {filteredData.seoIssues.brokenLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="font-mono text-sm text-orange-700">{link}</span>
                    <span className="text-xs text-orange-600">Manual review required</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-turquoise-500 mx-auto mb-4" />
          <p className="text-gray-600">Refreshing sitemap data...</p>
        </div>
      )}
    </div>
  )
}
