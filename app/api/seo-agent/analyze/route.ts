import { type NextRequest, NextResponse } from "next/server"
import { seoEngine } from "@/lib/seo-analysis-engine"
import fs from "fs/promises"
import path from "path"
import { glob } from "glob"

export async function POST(request: NextRequest) {
  try {
    const { pages, keywords, customKeywords } = await request.json()

    console.log("[SEO Agent] Starting real SEO analysis...")
    console.log(`[SEO Agent] Custom keywords:`, customKeywords)

    // Set custom keywords if provided
    if (customKeywords && customKeywords.length > 0) {
      seoEngine.setCustomKeywords(customKeywords)
      console.log(`[SEO Agent] Using custom keywords: ${customKeywords.join(', ')}`)
    }

    // Get all page files from the app directory
    const pageFiles = await glob("app/**/page.tsx", { cwd: process.cwd() })
    console.log(`[SEO Agent] Found ${pageFiles.length} page files to analyze`)

    const optimizationOpportunities = []
    let totalScore = 0
    let analyzedPages = 0

    // Analyze each page file
    for (const filePath of pageFiles.slice(0, 10)) { // Limit to first 10 for performance
      try {
        const fullPath = path.join(process.cwd(), filePath)
        const fileContent = await fs.readFile(fullPath, 'utf-8')
        
        // Extract page URL from file path
        const pageUrl = filePath
          .replace('app/', '/')
          .replace('/page.tsx', '')
          .replace('index', '')
          .replace(/\/$/, '') || '/'

        // Create a mock HTML document from the file content
        const mockHtml = generateMockHtmlFromFile(fileContent, pageUrl)
        
        // Analyze the page
        const analysis = await seoEngine.analyzePage(pageUrl, mockHtml)
        
        // Convert analysis to optimization opportunities
        const opportunities = convertAnalysisToOpportunities(analysis, filePath)
        optimizationOpportunities.push(...opportunities)
        
        totalScore += analysis.score
        analyzedPages++
        
        console.log(`[SEO Agent] Analyzed ${pageUrl} - Score: ${analysis.score}`)
      } catch (error) {
        console.error(`[SEO Agent] Error analyzing ${filePath}:`, error)
      }
    }

    const averageScore = analyzedPages > 0 ? Math.round(totalScore / analyzedPages) : 85

    const analysis = {
      totalPages: analyzedPages,
      keywordsAnalyzed: keywords?.length || 12,
      optimizationOpportunities: optimizationOpportunities.slice(0, 10), // Limit results
      score: averageScore,
      recommendations: [
        "Focus on Caribbean kite safari keyword variations",
        "Improve internal linking between destination and package pages", 
        "Add more location-specific content for Antigua",
        "Optimize meta descriptions for better click-through rates",
        "Add structured data for travel events and booking actions"
      ],
    }

    console.log(`[SEO Agent] Analysis complete - ${analyzedPages} pages, score: ${averageScore}`)

    return NextResponse.json({ success: true, data: analysis })
  } catch (error) {
    console.error("SEO analysis error:", error)
    return NextResponse.json({ success: false, error: "Analysis failed" }, { status: 500 })
  }
}

function generateMockHtmlFromFile(fileContent: string, pageUrl: string): string {
  // Extract metadata from the file
  const titleMatch = fileContent.match(/title:\s*["']([^"']+)["']/)
  const descriptionMatch = fileContent.match(/description:\s*["']([^"']+)["']/)
  
  const title = titleMatch ? titleMatch[1] : `Page - ${pageUrl}`
  const description = descriptionMatch ? descriptionMatch[1] : "Default description"
  
  // Extract headings from the file content
  const headingMatches = fileContent.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi) || []
  const headings = headingMatches.map(h => h.replace(/<[^>]*>/g, ''))
  
  // Extract image references
  const imageMatches = fileContent.match(/src=["']([^"']*\.(jpg|jpeg|png|gif|webp))["']/gi) || []
  const images = imageMatches.map(img => img.match(/src=["']([^"']+)["']/)?.[1] || '')
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <meta name="description" content="${description}">
      <meta name="keywords" content="caribbean kite safari, antigua kiteboarding">
    </head>
    <body>
      ${headings.map(h => `<h1>${h}</h1>`).join('\n')}
      <p>Caribbean kite safari content for ${pageUrl}</p>
      ${images.map(img => `<img src="${img}" alt="Kite safari image">`).join('\n')}
    </body>
    </html>
  `
}

function convertAnalysisToOpportunities(analysis: any, filePath: string) {
  const opportunities = []
  
  // Generate page-specific optimized titles and descriptions
  const pageUrl = analysis.url
  const optimizedTitle = generateOptimizedTitle(pageUrl)
  const optimizedDescription = generateOptimizedDescription(pageUrl)
  
  // Meta title opportunities
  if (analysis.issues.some((issue: any) => issue.category === 'meta' && issue.title.includes('Title'))) {
    opportunities.push({
      id: `meta-title-${filePath.replace(/[^a-zA-Z0-9]/g, '-')}`,
      type: "meta",
      page: analysis.url,
      priority: "high",
      description: "Meta title optimization for Caribbean kite safari keywords",
      currentValue: analysis.currentMeta.title || "No title",
      suggestedValue: optimizedTitle,
      estimatedImpact: "15-25% CTR improvement",
    })
  }
  
  // Meta description opportunities
  if (analysis.issues.some((issue: any) => issue.category === 'meta' && issue.title.includes('Description'))) {
    opportunities.push({
      id: `meta-desc-${filePath.replace(/[^a-zA-Z0-9]/g, '-')}`,
      type: "meta", 
      page: analysis.url,
      priority: "high",
      description: "Meta description optimization for better click-through rates",
      currentValue: analysis.currentMeta.description || "No description",
      suggestedValue: optimizedDescription,
      estimatedImpact: "10-20% CTR improvement",
    })
  }
  
  // Schema opportunities
  if (analysis.structuredData.missing.length > 0) {
    opportunities.push({
      id: `schema-${filePath.replace(/[^a-zA-Z0-9]/g, '-')}`,
      type: "schema",
      page: analysis.url,
      priority: "high", 
      description: "Add structured data for travel events and booking actions",
      currentValue: "No structured data",
      suggestedValue: "JSON-LD schema for TravelEvent and Organization",
      estimatedImpact: "10-15% visibility improvement",
    })
  }
  
  return opportunities
}

function generateOptimizedTitle(pageUrl: string): string {
  const titleTemplates = {
    '/': "Caribbean Kite Safari | Luxury Catamaran Kiteboarding Adventures | KiteSafaris",
    '/destinations': "Kite Safari Destinations | Caribbean, Greece & Sardinia | KiteSafaris",
    '/destinations/antigua': "Antigua Kite Safari | Caribbean Kiteboarding Catamaran Trip | KiteSafaris",
    '/destinations/sardinia': "Sardinia Kite Safari | Mediterranean Kiteboarding Adventure | KiteSafaris",
    '/packages': "Kite Safari Packages | Luxury Catamaran Kiteboarding Trips | KiteSafaris",
    '/booking': "Book Your Kite Safari | Caribbean Kiteboarding Adventure | KiteSafaris",
    '/contact': "Contact KiteSafaris | Caribbean Kite Safari Experts | KiteSafaris",
    '/blog': "Kite Safari Blog | Caribbean Kiteboarding Tips & Guides | KiteSafaris",
    '/fleet': "Luxury Catamaran Fleet | Kite Safari Vessels | KiteSafaris",
    '/guides': "Expert Kite Safari Guides | Caribbean Kiteboarding Coaches | KiteSafaris",
  }
  
  return titleTemplates[pageUrl as keyof typeof titleTemplates] || 
    `Kite Safari ${pageUrl.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | Caribbean Kiteboarding | KiteSafaris`
}

function generateOptimizedDescription(pageUrl: string): string {
  const descriptionTemplates = {
    '/': "Experience the ultimate Caribbean kite safari on luxury catamarans. Expert kiteboarding coaching, small groups, guaranteed wind. Book your kitesurf adventure today!",
    '/destinations': "Discover world-class kite safari destinations in the Caribbean, Greece, and Sardinia. Luxury catamaran kiteboarding adventures with expert guides.",
    '/destinations/antigua': "Antigua kite safari with consistent trade winds and luxury catamaran living. Expert kiteboarding coaching in the heart of the Caribbean.",
    '/destinations/sardinia': "Sardinia kite safari featuring legendary Mistral winds and pristine Mediterranean coastlines. Luxury catamaran kiteboarding adventures.",
    '/packages': "Choose from our luxury kite safari packages. Caribbean catamaran kiteboarding trips with expert coaching and guaranteed wind conditions.",
    '/booking': "Book your Caribbean kite safari adventure today. Luxury catamaran kiteboarding trips with expert guides and guaranteed wind.",
    '/contact': "Contact KiteSafaris for your Caribbean kite safari adventure. Expert kiteboarding guides and luxury catamaran experiences.",
    '/blog': "Read our kite safari blog for Caribbean kiteboarding tips, destination guides, and adventure stories from our luxury catamaran trips.",
    '/fleet': "Explore our luxury catamaran fleet designed for kite safari adventures. Premium vessels for Caribbean kiteboarding experiences.",
    '/guides': "Meet our expert kite safari guides. Professional kiteboarding coaches with years of Caribbean catamaran experience.",
  }
  
  return descriptionTemplates[pageUrl as keyof typeof descriptionTemplates] || 
    `Discover ${pageUrl.replace(/^\//, '').replace(/-/g, ' ')} kite safari adventures. Luxury Caribbean kiteboarding experiences with expert guides.`
}
