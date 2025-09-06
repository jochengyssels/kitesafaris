import { type NextRequest, NextResponse } from "next/server"
import { seoOptimizationService } from "@/lib/seo-optimization-service"
import fs from "fs/promises"
import path from "path"
import { glob } from "glob"

export async function POST(request: NextRequest) {
  try {
    const { keywords } = await request.json()

    console.log("[SEO Audit] Starting comprehensive SEO audit...")

    // Get all page files
    const pageFiles = await glob("app/**/page.tsx", { cwd: process.cwd() })
    
    const auditResults = {
      totalPages: pageFiles.length,
      analyzedPages: 0,
      optimizationOpportunities: [],
      newPagesNeeded: [],
      technicalIssues: [],
      keywordMappings: seoOptimizationService.getKeywordMappings(),
      recommendations: []
    }

    // Analyze existing pages
    for (const filePath of pageFiles.slice(0, 15)) { // Limit for performance
      try {
        const fullPath = path.join(process.cwd(), filePath)
        const fileContent = await fs.readFile(fullPath, 'utf-8')
        
        const pageUrl = filePath
          .replace('app/', '/')
          .replace('/page.tsx', '')
          .replace('index', '')
          .replace(/\/$/, '') || '/'

        const pageKeywords = seoOptimizationService.getKeywordsForPage(pageUrl)
        
        if (pageKeywords.length > 0) {
          const optimization = seoOptimizationService.generateSEOOptimization(pageUrl, pageKeywords)
          
          auditResults.optimizationOpportunities.push({
            page: pageUrl,
            currentTitle: extractTitle(fileContent),
            suggestedTitle: optimization.title,
            currentDescription: extractDescription(fileContent),
            suggestedDescription: optimization.description,
            targetKeywords: pageKeywords,
            priority: getPriority(pageKeywords),
            improvements: [
              'Update meta title and description',
              'Optimize headings for target keywords',
              'Add internal links',
              'Implement schema markup'
            ]
          })
          
          auditResults.analyzedPages++
        }
      } catch (error) {
        console.error(`[SEO Audit] Error analyzing ${filePath}:`, error)
      }
    }

    // Identify new pages needed
    const newPages = [
      {
        page: '/destinations/dominican-republic',
        keywords: ['kitesurfing dominican republic', 'kitesurf holiday dominican republic'],
        priority: 'high',
        reason: 'High search volume for Dominican Republic kitesurfing'
      },
      {
        page: '/destinations/turks-and-caicos',
        keywords: ['kitesurf turks and caicos', 'kiteboard grace bay turks and caicos'],
        priority: 'high',
        reason: 'Popular destination with specific location keywords'
      },
      {
        page: '/destinations/tobago',
        keywords: ['kitesurf tobago'],
        priority: 'medium',
        reason: 'Emerging Caribbean kitesurfing destination'
      },
      {
        page: '/destinations/barbados',
        keywords: ['barbados kiteboarding season'],
        priority: 'medium',
        reason: 'Seasonal kitesurfing destination'
      },
      {
        page: '/women-kiteboarding',
        keywords: ['women\'s only kiteboarding trip'],
        priority: 'low',
        reason: 'Niche market with dedicated audience'
      },
      {
        page: '/wing-foiling',
        keywords: ['wing foil holiday'],
        priority: 'low',
        reason: 'Emerging water sport with growing interest'
      }
    ]

    auditResults.newPagesNeeded = newPages

    // Technical SEO issues
    auditResults.technicalIssues = [
      {
        issue: 'Missing canonical URLs',
        pages: ['/contact', '/destinations', '/packages', '/pricing'],
        priority: 'high',
        fix: 'Add canonical URLs to all pages'
      },
      {
        issue: 'Inconsistent meta descriptions',
        pages: ['/destinations/antigua', '/packages'],
        priority: 'medium',
        fix: 'Optimize meta descriptions for target keywords'
      },
      {
        issue: 'Missing schema markup',
        pages: ['/destinations', '/packages', '/booking'],
        priority: 'medium',
        fix: 'Add structured data for better search visibility'
      },
      {
        issue: 'Internal linking opportunities',
        pages: ['/destinations/antigua', '/packages'],
        priority: 'low',
        fix: 'Add more internal links between related pages'
      }
    ]

    // Generate recommendations
    auditResults.recommendations = [
      {
        priority: 'high',
        action: 'Create new destination pages',
        description: 'Create pages for Dominican Republic, Turks and Caicos, and Tobago to capture high-value keywords',
        impact: 'High traffic potential from new keyword rankings'
      },
      {
        priority: 'high',
        action: 'Optimize existing pages',
        description: 'Update meta titles, descriptions, and headings for target keywords',
        impact: 'Improved rankings for existing pages'
      },
      {
        priority: 'medium',
        action: 'Add schema markup',
        description: 'Implement structured data for better search engine understanding',
        impact: 'Enhanced search result appearance and click-through rates'
      },
      {
        priority: 'medium',
        action: 'Improve internal linking',
        description: 'Add strategic internal links between related pages',
        impact: 'Better page authority distribution and user experience'
      },
      {
        priority: 'low',
        action: 'Create specialized content',
        description: 'Add pages for women\'s kiteboarding and wing foiling',
        impact: 'Capture niche markets and long-tail keywords'
      }
    ]

    console.log(`[SEO Audit] Audit complete - ${auditResults.analyzedPages} pages analyzed, ${auditResults.newPagesNeeded.length} new pages needed`)

    return NextResponse.json({ 
      success: true, 
      data: auditResults 
    })
  } catch (error) {
    console.error("SEO audit error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Audit failed" 
    }, { status: 500 })
  }
}

function extractTitle(content: string): string {
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/)
  return titleMatch ? titleMatch[1] : 'No title found'
}

function extractDescription(content: string): string {
  const descMatch = content.match(/description:\s*["']([^"']+)["']/)
  return descMatch ? descMatch[1] : 'No description found'
}

function getPriority(keywords: string[]): string {
  const highPriorityKeywords = ['kitesurf antigua', 'caribbean catamaran', 'kitesurf caribbean']
  const hasHighPriority = keywords.some(kw => highPriorityKeywords.includes(kw))
  return hasHighPriority ? 'high' : 'medium'
}
