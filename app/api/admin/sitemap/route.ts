import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { glob } from "glob"

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
  icon: string
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

// Category definitions with icons and colors
const CATEGORIES: Omit<SitemapCategory, "pages">[] = [
  { name: "🏠 Main Pages", icon: "🏠", color: "bg-blue-100 text-blue-800" },
  { name: "🗺️ Destinations", icon: "🗺️", color: "bg-green-100 text-green-800" },
  { name: "⛵ Fleet & Booking", icon: "⛵", color: "bg-cyan-100 text-cyan-800" },
  { name: "🛍️ Shop & E-commerce", icon: "🛍️", color: "bg-purple-100 text-purple-800" },
  { name: "📚 Guides & Content", icon: "📚", color: "bg-indigo-100 text-indigo-800" },
  { name: "✈️ Travel & Flights", icon: "✈️", color: "bg-orange-100 text-orange-800" },
  { name: "🏆 About & Information", icon: "🏆", color: "bg-yellow-100 text-yellow-800" },
  { name: "📋 Policies & Legal", icon: "📋", color: "bg-red-100 text-red-800" },
  { name: "🔧 Admin & Management", icon: "🔧", color: "bg-gray-100 text-gray-800" },
  { name: "🔌 API Routes", icon: "🔌", color: "bg-pink-100 text-pink-800" },
  { name: "📱 Special Features", icon: "📱", color: "bg-teal-100 text-teal-800" },
]

// Route categorization logic
function categorizeRoute(routePath: string): string {
  if (routePath === "/" || routePath === "/sitemap.xml") return "🏠 Main Pages"
  if (routePath.startsWith("/destinations")) return "🗺️ Destinations"
  if (["/fleet", "/booking", "/packages"].includes(routePath)) return "⛵ Fleet & Booking"
  if (routePath.startsWith("/shop")) return "🛍️ Shop & E-commerce"
  if (["/guides", "/blog", "/gallery"].includes(routePath) || routePath.startsWith("/guides/")) return "📚 Guides & Content"
  if (routePath.startsWith("/flights-") || routePath.includes("antigua-kite-safari")) return "✈️ Travel & Flights"
  if (["/why-us", "/expert-guides", "/small-groups", "/premium-equipment", "/guaranteed-wind", "/reviews", "/contact"].includes(routePath)) return "🏆 About & Information"
  if (routePath.startsWith("/policies") || ["/privacy", "/terms"].includes(routePath)) return "📋 Policies & Legal"
  if (routePath.startsWith("/admin")) return "🔧 Admin & Management"
  if (routePath.startsWith("/api")) return "🔌 API Routes"
  if (["/sardinian-awakening", "/faq"].includes(routePath)) return "📱 Special Features"
  
  return "📱 Special Features" // Default category
}

// Extract metadata from page files
async function extractPageMetadata(filePath: string): Promise<{ title?: string; description?: string }> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    
    // Extract title from metadata
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/)
    const descriptionMatch = content.match(/description:\s*["']([^"']+)["']/)
    
    return {
      title: titleMatch?.[1],
      description: descriptionMatch?.[1]
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return {}
  }
}

// Get file stats
async function getFileStats(filePath: string): Promise<{ lastModified?: string; fileSize?: string }> {
  try {
    const stats = await fs.stat(filePath)
    return {
      lastModified: stats.mtime.toISOString(),
      fileSize: `${(stats.size / 1024).toFixed(1)} KB`
    }
  } catch (error) {
    return {}
  }
}

// Check if route is protected/admin only
function isProtectedRoute(routePath: string): boolean {
  return routePath.startsWith("/admin") || routePath.startsWith("/api/admin")
}

// Check if route is dynamic
function isDynamicRoute(routePath: string): boolean {
  return routePath.includes("[") && routePath.includes("]")
}

// Extract dynamic parameters
function extractDynamicParams(routePath: string): string[] {
  const matches = routePath.match(/\[([^\]]+)\]/g)
  return matches ? matches.map(match => match.slice(1, -1)) : []
}

// Generate sitemap data
async function generateSitemapData(): Promise<SitemapData> {
  const appDir = path.join(process.cwd(), "app")
  const pages: SitemapPage[] = []
  
  try {
    // Find all page.tsx files in the app directory
    const pageFiles = await glob("**/page.tsx", { cwd: appDir, absolute: true })
    
    for (const filePath of pageFiles) {
      const relativePath = path.relative(appDir, filePath)
      const routePath = "/" + relativePath.replace(/\/page\.tsx$/, "").replace(/\/\([^)]+\)/g, "")
      
      // Skip if it's a layout or other non-page file
      if (relativePath.includes("layout.tsx") || relativePath.includes("loading.tsx") || relativePath.includes("error.tsx")) {
        continue
      }
      
      // Handle root page
      const finalRoutePath = routePath === "/app" ? "/" : routePath
      
      // Extract metadata and file stats
      const metadata = await extractPageMetadata(filePath)
      const fileStats = await getFileStats(filePath)
      
      // Determine status
      let status: "active" | "missing" | "protected" = "active"
      if (isProtectedRoute(finalRoutePath)) {
        status = "protected"
      }
      
      const page: SitemapPage = {
        path: finalRoutePath,
        fileLocation: `app/${relativePath}`,
        title: metadata.title,
        description: metadata.description,
        status,
        lastModified: fileStats.lastModified,
        fileSize: fileStats.fileSize,
        category: categorizeRoute(finalRoutePath),
        isDynamic: isDynamicRoute(finalRoutePath),
        dynamicParams: extractDynamicParams(finalRoutePath)
      }
      
      pages.push(page)
    }
    
    // Add sitemap.xml
    const sitemapPath = path.join(appDir, "sitemap.xml")
    if (await fs.access(sitemapPath).then(() => true).catch(() => false)) {
      const fileStats = await getFileStats(sitemapPath)
      pages.push({
        path: "/sitemap.xml",
        fileLocation: "app/sitemap.xml",
        title: "XML Sitemap",
        description: "Search engine sitemap",
        status: "active",
        lastModified: fileStats.lastModified,
        fileSize: fileStats.fileSize,
        category: "🏠 Main Pages",
        isDynamic: false
      })
    }
    
    // Group pages by category
    const categories = CATEGORIES.map(cat => ({
      ...cat,
      pages: pages.filter(page => page.category === cat.name)
    }))
    
    // Find orphaned pages (not linked from navigation)
    const navigationRoutes = [
      "/", "/destinations", "/fleet", "/booking", "/shop", "/guides", "/why-us", 
      "/contact", "/packages", "/gallery", "/reviews", "/faq"
    ]
    const orphanedPages = pages.filter(page => 
      !navigationRoutes.includes(page.path) && 
      !page.path.startsWith("/admin") && 
      !page.path.startsWith("/api") &&
      !page.path.startsWith("/policies")
    )
    
    // Analyze SEO issues
    const missingTitles = pages.filter(page => !page.title).map(page => page.path)
    const missingDescriptions = pages.filter(page => !page.description).map(page => page.path)
    const brokenLinks: string[] = [] // This would require more complex analysis
    
    return {
      categories,
      lastUpdated: new Date().toISOString(),
      totalPages: pages.length,
      orphanedPages,
      seoIssues: {
        missingTitles,
        missingDescriptions,
        brokenLinks
      }
    }
    
  } catch (error) {
    console.error("Error generating sitemap data:", error)
    throw error
  }
}

export async function GET(request: NextRequest) {
  try {
    // Basic rate limiting check - simplified to avoid dynamic server usage
    console.log(`[Sitemap API] Request received`)
    
    const sitemapData = await generateSitemapData()
    
    return NextResponse.json(sitemapData, {
      headers: {
        "Cache-Control": "public, max-age=300" // Cache for 5 minutes
      }
    })
    
  } catch (error) {
    console.error("[Sitemap API] Error:", error)
    return NextResponse.json(
      { 
        error: "Failed to generate sitemap data",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
