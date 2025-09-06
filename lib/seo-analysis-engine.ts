export interface SEOAnalysisResult {
  url: string
  title: string
  score: number
  issues: SEOIssue[]
  opportunities: SEOOpportunity[]
  currentMeta: MetaData
  recommendedMeta: MetaData
  keywords: KeywordAnalysis
  images: ImageAnalysis[]
  structuredData: StructuredDataAnalysis
  internalLinks: LinkAnalysis[]
  performance: PerformanceMetrics
}

export interface SEOIssue {
  type: "critical" | "warning" | "info"
  category: "meta" | "content" | "images" | "links" | "schema" | "performance"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  fix: string
  element?: string
}

export interface SEOOpportunity {
  type: "keyword" | "content" | "meta" | "schema" | "link"
  title: string
  description: string
  potentialImpact: number
  effort: "low" | "medium" | "high"
  recommendation: string
}

export interface MetaData {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalUrl?: string
  robots?: string
}

export interface KeywordAnalysis {
  primary: string[]
  secondary: string[]
  density: Record<string, number>
  missing: string[]
  opportunities: string[]
}

export interface ImageAnalysis {
  src: string
  alt: string
  title?: string
  size?: number
  optimized: boolean
  issues: string[]
  recommendations: string[]
}

export interface StructuredDataAnalysis {
  present: string[]
  missing: string[]
  recommendations: StructuredDataRecommendation[]
}

export interface StructuredDataRecommendation {
  type: string
  description: string
  priority: "high" | "medium" | "low"
  schema: object
}

export interface LinkAnalysis {
  href: string
  text: string
  type: "internal" | "external"
  optimized: boolean
  recommendations: string[]
}

export interface PerformanceMetrics {
  loadTime: number
  imageOptimization: number
  codeOptimization: number
  mobileOptimization: number
}

export class SEOAnalysisEngine {
  private readonly defaultCaribbeanKeywords = [
    "caribbean kite safari",
    "antigua kiteboarding",
    "catamaran kite safari",
    "luxury kite safari antigua",
    "caribbean kitesurfing trip",
    "antigua kite safari booking",
    "catamaran kiteboarding antigua",
    "caribbean kite adventure",
    "antigua kite vacation",
    "luxury kiteboarding caribbean",
  ]

  private readonly defaultSecondaryKeywords = [
    "kite safari",
    "kiteboarding trip",
    "catamaran sailing",
    "antigua vacation",
    "caribbean adventure",
    "kite lessons",
    "wind sports",
    "sailing vacation",
    "tropical kiteboarding",
    "kite coaching",
  ]

  private customKeywords: string[] = []
  private customSecondaryKeywords: string[] = []

  setCustomKeywords(primary: string[], secondary: string[] = []) {
    this.customKeywords = primary
    this.customSecondaryKeywords = secondary
  }

  private get caribbeanKeywords() {
    return this.customKeywords.length > 0 ? this.customKeywords : this.defaultCaribbeanKeywords
  }

  private get secondaryKeywords() {
    return this.customSecondaryKeywords.length > 0 ? this.customSecondaryKeywords : this.defaultSecondaryKeywords
  }

  async analyzePage(url: string, html: string): Promise<SEOAnalysisResult> {
    // Simple HTML parsing using regex for server-side compatibility
    const doc = this.parseHTML(html)

    const currentMeta = this.extractMetaData(doc)
    const recommendedMeta = this.generateOptimizedMeta(url, doc)
    const keywords = this.analyzeKeywords(doc)
    const images = this.analyzeImages(doc)
    const structuredData = this.analyzeStructuredData(doc)
    const internalLinks = this.analyzeInternalLinks(doc)
    const issues = this.identifyIssues(doc, currentMeta, keywords, images)
    const opportunities = this.identifyOpportunities(url, doc, keywords)
    const performance = this.analyzePerformance(doc)

    const score = this.calculateSEOScore(issues, opportunities, keywords, currentMeta)

    return {
      url,
      title: currentMeta.title || "Untitled Page",
      score,
      issues,
      opportunities,
      currentMeta,
      recommendedMeta,
      keywords,
      images,
      structuredData,
      internalLinks,
      performance,
    }
  }

  private extractMetaData(doc: Document): MetaData {
    const getMetaContent = (name: string): string | undefined => {
      const meta = doc.querySelector(`meta[name="${name}"], meta[property="${name}"]`)
      return meta?.getAttribute("content") || undefined
    }

    return {
      title: doc.title,
      description: getMetaContent("description"),
      keywords: getMetaContent("keywords"),
      ogTitle: getMetaContent("og:title"),
      ogDescription: getMetaContent("og:description"),
      ogImage: getMetaContent("og:image"),
      canonicalUrl: doc.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      robots: getMetaContent("robots"),
    }
  }

  private generateOptimizedMeta(url: string, doc: Document): MetaData {
    const pageType = this.identifyPageType(url)
    const content = doc.body?.textContent || ""

    let optimizedTitle = ""
    let optimizedDescription = ""

    switch (pageType) {
      case "home":
        optimizedTitle = "Caribbean Kite Safari Antigua | Luxury Catamaran Kiteboarding Trips | KiteSafaris"
        optimizedDescription =
          "Book your Caribbean kite safari in Antigua! 7-day luxury catamaran kiteboarding adventures with expert coaching. Small groups, guaranteed wind, all-inclusive. From €1,900."
        break
      case "destinations":
        optimizedTitle = "Antigua Kiteboarding Destination | Caribbean Kite Safari Trips | KiteSafaris"
        optimizedDescription =
          "Discover Antigua's best kiteboarding spots on our luxury catamaran safaris. Perfect wind conditions, crystal waters, expert guides. Book your Caribbean kite adventure today!"
        break
      case "packages":
        optimizedTitle = "Antigua Kite Safari Packages | 7-Day Catamaran Kiteboarding Trips | KiteSafaris"
        optimizedDescription =
          "Choose your perfect Antigua kite safari package. Luxury catamaran accommodations, expert coaching, all meals included. Small groups of max 6 guests. Book now!"
        break
      case "booking":
        optimizedTitle = "Book Antigua Kite Safari | Caribbean Catamaran Kiteboarding Trip | KiteSafaris"
        optimizedDescription =
          "Secure your spot on our exclusive Antigua kite safari. 7 days of luxury catamaran kiteboarding with expert coaching. Limited to 6 guests per trip."
        break
      default:
        optimizedTitle = `${this.extractMainHeading(doc)} | Caribbean Kite Safari Antigua | KiteSafaris`
        optimizedDescription = this.generateDescriptionFromContent(content)
    }

    return {
      title: optimizedTitle,
      description: optimizedDescription,
      ogTitle: optimizedTitle,
      ogDescription: optimizedDescription,
      ogImage: "/images/antigua-kite-safari-hero.jpg",
      canonicalUrl: url,
      robots: "index, follow",
    }
  }

  private analyzeKeywords(doc: Document): KeywordAnalysis {
    const content = (doc.body?.textContent || "").toLowerCase()
    const words = content.split(/\s+/)
    const totalWords = words.length

    const density: Record<string, number> = {}
    const found: string[] = []
    const missing: string[] = []

    // Analyze primary keywords
    this.caribbeanKeywords.forEach((keyword) => {
      const keywordLower = keyword.toLowerCase()
      const occurrences = (content.match(new RegExp(keywordLower, "g")) || []).length
      const keywordDensity = (occurrences / totalWords) * 100

      density[keyword] = keywordDensity

      if (occurrences > 0) {
        found.push(keyword)
      } else {
        missing.push(keyword)
      }
    })

    // Generate opportunities
    const opportunities = missing.slice(0, 5) // Top 5 missing keywords

    return {
      primary: found,
      secondary: this.secondaryKeywords.filter((kw) => content.includes(kw.toLowerCase())),
      density,
      missing,
      opportunities,
    }
  }

  private analyzeImages(doc: Document): ImageAnalysis[] {
    const images = Array.from(doc.querySelectorAll("img"))

    return images.map((img) => {
      const src = img.getAttribute("src") || ""
      const alt = img.getAttribute("alt") || ""
      const title = img.getAttribute("title")

      const issues: string[] = []
      const recommendations: string[] = []

      // Check for missing alt text
      if (!alt) {
        issues.push("Missing alt text")
        recommendations.push("Add descriptive alt text with Caribbean kite safari keywords")
      } else if (alt.length < 10) {
        issues.push("Alt text too short")
        recommendations.push("Expand alt text to be more descriptive")
      } else if (!this.containsTargetKeywords(alt)) {
        recommendations.push("Include relevant keywords in alt text")
      }

      // Check for optimization opportunities
      if (!src.includes("optimized") && !src.includes("webp")) {
        recommendations.push("Optimize image format and compression")
      }

      const optimized = issues.length === 0 && this.containsTargetKeywords(alt)

      return {
        src,
        alt,
        title,
        optimized,
        issues,
        recommendations,
      }
    })
  }

  private analyzeStructuredData(doc: Document): StructuredDataAnalysis {
    const scripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'))
    const present: string[] = []

    scripts.forEach((script) => {
      try {
        const data = JSON.parse(script.textContent || "")
        if (data["@type"]) {
          present.push(data["@type"])
        }
      } catch (e) {
        // Invalid JSON
      }
    })

    const missing: string[] = []
    const recommendations: StructuredDataRecommendation[] = []

    // Check for essential schema types
    if (!present.includes("Organization")) {
      missing.push("Organization")
      recommendations.push({
        type: "Organization",
        description: "Add organization schema for KiteSafaris brand recognition",
        priority: "high",
        schema: {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "KiteSafaris",
          description: "Luxury Caribbean kite safari adventures",
          url: "https://kitesafaris.com",
        },
      })
    }

    if (!present.includes("TravelEvent")) {
      missing.push("TravelEvent")
      recommendations.push({
        type: "TravelEvent",
        description: "Add travel event schema for Antigua kite safari trips",
        priority: "high",
        schema: {
          "@context": "https://schema.org",
          "@type": "TravelEvent",
          name: "Antigua Kite Safari",
          description: "7-day luxury catamaran kiteboarding adventure",
          location: "Antigua and Barbuda",
        },
      })
    }

    return {
      present,
      missing,
      recommendations,
    }
  }

  private analyzeInternalLinks(doc: Document): LinkAnalysis[] {
    const links = Array.from(doc.querySelectorAll('a[href^="/"], a[href^="https://kitesafaris.com"]'))

    return links.map((link) => {
      const href = link.getAttribute("href") || ""
      const text = link.textContent?.trim() || ""
      const recommendations: string[] = []

      let optimized = true

      // Check for generic link text
      if (["click here", "read more", "learn more", "here"].includes(text.toLowerCase())) {
        optimized = false
        recommendations.push("Use descriptive anchor text with target keywords")
      }

      // Check for keyword opportunities
      if (!this.containsTargetKeywords(text) && href.includes("antigua")) {
        recommendations.push('Include "Antigua kite safari" or related keywords in link text')
      }

      return {
        href,
        text,
        type: "internal" as const,
        optimized,
        recommendations,
      }
    })
  }

  private identifyIssues(
    doc: Document,
    meta: MetaData,
    keywords: KeywordAnalysis,
    images: ImageAnalysis[],
  ): SEOIssue[] {
    const issues: SEOIssue[] = []

    // Meta title issues
    if (!meta.title) {
      issues.push({
        type: "critical",
        category: "meta",
        title: "Missing Page Title",
        description: "Page is missing a title tag",
        impact: "high",
        fix: "Add optimized title with Caribbean kite safari keywords",
        element: "<title>",
      })
    } else if (meta.title.length > 60) {
      issues.push({
        type: "warning",
        category: "meta",
        title: "Title Too Long",
        description: "Title exceeds 60 characters and may be truncated",
        impact: "medium",
        fix: "Shorten title while keeping key Caribbean kite safari keywords",
        element: "<title>",
      })
    }

    // Meta description issues
    if (!meta.description) {
      issues.push({
        type: "critical",
        category: "meta",
        title: "Missing Meta Description",
        description: "Page is missing a meta description",
        impact: "high",
        fix: "Add compelling description targeting Antigua kite safari bookings",
        element: '<meta name="description">',
      })
    }

    // Keyword issues
    if (keywords.primary.length === 0) {
      issues.push({
        type: "warning",
        category: "content",
        title: "No Target Keywords Found",
        description: "Page content lacks Caribbean kite safari keywords",
        impact: "high",
        fix: "Incorporate primary keywords naturally throughout content",
      })
    }

    // Image issues
    const imagesWithoutAlt = images.filter((img) => !img.alt)
    if (imagesWithoutAlt.length > 0) {
      issues.push({
        type: "warning",
        category: "images",
        title: `${imagesWithoutAlt.length} Images Missing Alt Text`,
        description: "Images without alt text hurt accessibility and SEO",
        impact: "medium",
        fix: "Add descriptive alt text with relevant keywords to all images",
      })
    }

    return issues
  }

  private identifyOpportunities(url: string, doc: Document, keywords: KeywordAnalysis): SEOOpportunity[] {
    const opportunities: SEOOpportunity[] = []

    // Keyword opportunities
    if (keywords.missing.length > 0) {
      opportunities.push({
        type: "keyword",
        title: "Target Missing Keywords",
        description: `Add ${keywords.missing.slice(0, 3).join(", ")} to improve Caribbean kite safari rankings`,
        potentialImpact: 85,
        effort: "medium",
        recommendation: "Naturally incorporate these keywords into headings and content",
      })
    }

    // Content opportunities
    const headings = doc.querySelectorAll("h1, h2, h3")
    const headingsWithKeywords = Array.from(headings).filter((h) => this.containsTargetKeywords(h.textContent || ""))

    if (headingsWithKeywords.length < headings.length / 2) {
      opportunities.push({
        type: "content",
        title: "Optimize Headings for Keywords",
        description: "Add Caribbean kite safari keywords to more headings",
        potentialImpact: 70,
        effort: "low",
        recommendation: "Include target keywords in H2 and H3 headings naturally",
      })
    }

    // Schema opportunities
    if (!doc.querySelector('script[type="application/ld+json"]')) {
      opportunities.push({
        type: "schema",
        title: "Add Structured Data",
        description: "Implement schema markup for better search visibility",
        potentialImpact: 90,
        effort: "medium",
        recommendation: "Add TravelEvent and Organization schema for Antigua trips",
      })
    }

    return opportunities
  }

  private analyzePerformance(doc: Document): PerformanceMetrics {
    const images = doc.querySelectorAll("img")
    const scripts = doc.querySelectorAll("script")
    const styles = doc.querySelectorAll('link[rel="stylesheet"], style')

    // Simple performance scoring (in real implementation, would use actual metrics)
    const imageOptimization =
      (Array.from(images).filter(
        (img) => img.getAttribute("loading") === "lazy" || img.getAttribute("src")?.includes("webp"),
      ).length /
        images.length) *
      100

    const codeOptimization = 85 // Placeholder
    const mobileOptimization = 90 // Placeholder
    const loadTime = 2.3 // Placeholder

    return {
      loadTime,
      imageOptimization,
      codeOptimization,
      mobileOptimization,
    }
  }

  private calculateSEOScore(
    issues: SEOIssue[],
    opportunities: SEOOpportunity[],
    keywords: KeywordAnalysis,
    meta: MetaData,
  ): number {
    let score = 100

    // Deduct points for issues
    issues.forEach((issue) => {
      switch (issue.impact) {
        case "high":
          score -= issue.type === "critical" ? 15 : 10
          break
        case "medium":
          score -= issue.type === "critical" ? 8 : 5
          break
        case "low":
          score -= 2
          break
      }
    })

    // Bonus points for good practices
    if (meta.title && meta.title.length <= 60) score += 5
    if (meta.description && meta.description.length <= 160) score += 5
    if (keywords.primary.length > 0) score += 10

    return Math.max(0, Math.min(100, score))
  }

  private identifyPageType(url: string): string {
    if (url === "/" || url.includes("/home")) return "home"
    if (url.includes("/destinations")) return "destinations"
    if (url.includes("/packages")) return "packages"
    if (url.includes("/booking")) return "booking"
    if (url.includes("/contact")) return "contact"
    return "other"
  }

  private extractMainHeading(doc: Document): string {
    const h1 = doc.querySelector("h1")
    return h1?.textContent?.trim() || "Page"
  }

  private generateDescriptionFromContent(content: string): string {
    const sentences = content.split(".").filter((s) => s.trim().length > 20)
    const firstSentence = sentences[0]?.trim()

    if (firstSentence && firstSentence.length <= 160) {
      return firstSentence + "."
    }

    return "Discover luxury Caribbean kite safari adventures in Antigua with expert coaching and catamaran accommodations."
  }

  private containsTargetKeywords(text: string): boolean {
    const textLower = text.toLowerCase()
    return (
      this.caribbeanKeywords.some((keyword) => textLower.includes(keyword.toLowerCase())) ||
      this.secondaryKeywords.some((keyword) => textLower.includes(keyword.toLowerCase()))
    )
  }

  async analyzeSite(urls: string[]): Promise<SEOAnalysisResult[]> {
    const results: SEOAnalysisResult[] = []

    for (const url of urls) {
      try {
        // In a real implementation, this would fetch the actual HTML
        const response = await fetch(url)
        const html = await response.text()
        const analysis = await this.analyzePage(url, html)
        results.push(analysis)
      } catch (error) {
        console.error(`Failed to analyze ${url}:`, error)
      }
    }

    return results
  }

  private parseHTML(html: string): any {
    // Simple HTML parser using regex for server-side compatibility
    return {
      title: this.extractTitle(html),
      querySelector: (selector: string) => this.querySelector(html, selector),
      querySelectorAll: (selector: string) => this.querySelectorAll(html, selector),
      body: { textContent: this.extractTextContent(html) }
    }
  }

  private extractTitle(html: string): string {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    return titleMatch ? titleMatch[1] : ''
  }

  private extractTextContent(html: string): string {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  }

  private querySelector(html: string, selector: string): any {
    if (selector === 'title') {
      return { textContent: this.extractTitle(html) }
    }
    if (selector.startsWith('meta[name="')) {
      const name = selector.match(/meta\[name="([^"]+)"/)?.[1]
      const match = html.match(new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']+)["']`, 'i'))
      return match ? { getAttribute: (attr: string) => attr === 'content' ? match[1] : null } : null
    }
    if (selector.startsWith('meta[property="')) {
      const property = selector.match(/meta\[property="([^"]+)"/)?.[1]
      const match = html.match(new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']+)["']`, 'i'))
      return match ? { getAttribute: (attr: string) => attr === 'content' ? match[1] : null } : null
    }
    if (selector === 'link[rel="canonical"]') {
      const match = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
      return match ? { getAttribute: (attr: string) => attr === 'href' ? match[1] : null } : null
    }
    if (selector.startsWith('h1')) {
      const match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)
      return match ? { textContent: match[1] } : null
    }
    if (selector.startsWith('img')) {
      const matches = html.match(/<img[^>]*>/gi) || []
      return matches.map((img: string) => ({
        getAttribute: (attr: string) => {
          const match = img.match(new RegExp(`${attr}=["']([^"']+)["']`, 'i'))
          return match ? match[1] : null
        }
      }))
    }
    return null
  }

  private querySelectorAll(html: string, selector: string): any[] {
    if (selector.startsWith('h1, h2, h3')) {
      const matches = html.match(/<h[1-3][^>]*>([^<]+)<\/h[1-3]>/gi) || []
      return matches.map((heading: string) => ({
        textContent: heading.replace(/<[^>]*>/g, '')
      }))
    }
    if (selector.startsWith('img')) {
      const matches = html.match(/<img[^>]*>/gi) || []
      return matches.map((img: string) => ({
        getAttribute: (attr: string) => {
          const match = img.match(new RegExp(`${attr}=["']([^"']+)["']`, 'i'))
          return match ? match[1] : null
        }
      }))
    }
    if (selector.startsWith('a[href^="/"], a[href^="https://kitesafaris.com"]')) {
      const matches = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>([^<]+)<\/a>/gi) || []
      return matches.map((link: string) => {
        const hrefMatch = link.match(/href=["']([^"']+)["']/i)
        const textMatch = link.match(/>([^<]+)</i)
        return {
          getAttribute: (attr: string) => attr === 'href' ? hrefMatch?.[1] : null,
          textContent: textMatch?.[1]?.trim() || ''
        }
      })
    }
    if (selector === 'script[type="application/ld+json"]') {
      const matches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([^<]+)<\/script>/gi) || []
      return matches.map((script: string) => ({
        textContent: script.replace(/<[^>]*>/g, '')
      }))
    }
    return []
  }
}

export const seoEngine = new SEOAnalysisEngine()
