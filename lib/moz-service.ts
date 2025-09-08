interface MozBacklinkData {
  domain: string
  links: number
  domainRating: number
  pageRating: number
  type: string
  url: string
  title: string
  anchorText: string
  spamScore: number
  lastCrawled: string
  dateFirstSeen: string
  dateLastSeen: string
  isNofollow: boolean
  isRedirect: boolean
  targetPage: string
  targetDomain: string
  linkPropensity: number
  pagesToDomain: number
  rootDomainsToDomain: number
}

interface MozResponse {
  results: Array<{
    source: {
      page: string
      subdomain: string
      root_domain: string
      title: string
      last_crawled: string
      http_code: number
      page_authority: number
      domain_authority: number
      spam_score: number
      link_propensity: number
      pages_to_root_domain: number
      root_domains_to_root_domain: number
    }
    target: {
      page: string
      subdomain: string
      root_domain: string
      title: string
      last_crawled: string
      http_code: number
      page_authority: number
      domain_authority: number
      spam_score: number
    }
    anchor_text: string
    date_first_seen: string
    date_last_seen: string
    date_disappeared: string
    nofollow: boolean
    redirect: boolean
    rel_canonical: boolean
    via_redirect: boolean
    via_rel_canonical: boolean
  }>
  next_token: string
}

export class MozService {
  private apiKey: string
  private baseUrl = 'https://lsapi.seomoz.com/v2'

  constructor() {
    this.apiKey = process.env.MOZ_API_KEY || ''
    
    if (!this.apiKey) {
      console.warn('⚠️ MOZ API key not found. Backlink data will use mock data.')
    } else {
      console.log('✅ MOZ API key found. Real backlink data will be fetched.')
    }
  }

  async getBacklinkData(targetUrl: string = 'https://kitesafaris.com'): Promise<MozBacklinkData[]> {
    if (!this.apiKey) {
      console.log('📊 Using mock backlink data (MOZ API key not configured)')
      return this.getMockBacklinkData()
    }

    try {
      console.log('🔗 Fetching real backlink data from MOZ Link Explorer...')
      
      // MOZ Link Explorer API endpoint for backlinks - using correct v2 format
      const response = await fetch(`${this.baseUrl}/links`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target: targetUrl,
          scope: 'page',
          limit: 25,
          filter: 'external',
          source_cols: ['title', 'anchor_text', 'spam_score', 'domain_authority', 'page_authority', 'link_type', 'source_url', 'target_url']
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('MOZ API Error Details:', errorText)
        throw new Error(`MOZ API error: ${response.status} ${response.statusText} - ${errorText}`)
      }

      const data: MozResponse = await response.json()
      
      console.log('🔍 MOZ API Raw Response:', JSON.stringify(data, null, 2))
      console.log('🔍 Number of results:', data.results.length)
      
      // Transform MOZ data to our format with rich information
      const backlinkData: MozBacklinkData[] = data.results.map(link => {
        const source = link.source
        const target = link.target
        
        return {
          domain: source.root_domain,
          links: 1, // Each result is one link
          domainRating: source.domain_authority,
          pageRating: source.page_authority,
          type: this.categorizeLinkType(link.nofollow, link.anchor_text, source.title),
          url: `https://${source.page}`,
          title: source.title || 'No title available',
          anchorText: link.anchor_text,
          spamScore: source.spam_score,
          lastCrawled: source.last_crawled,
          dateFirstSeen: link.date_first_seen,
          dateLastSeen: link.date_last_seen,
          isNofollow: link.nofollow,
          isRedirect: link.redirect,
          targetPage: target.page,
          targetDomain: target.root_domain,
          linkPropensity: source.link_propensity,
          pagesToDomain: source.pages_to_root_domain,
          rootDomainsToDomain: source.root_domains_to_root_domain
        }
      })

      // Group by domain and aggregate with enhanced metrics
      const domainMap = new Map<string, MozBacklinkData>()
      
      backlinkData.forEach(link => {
        const existing = domainMap.get(link.domain)
        if (existing) {
          existing.links += 1
          // Keep the highest domain rating and page rating
          if (link.domainRating > existing.domainRating) {
            existing.domainRating = link.domainRating
          }
          if (link.pageRating > existing.pageRating) {
            existing.pageRating = link.pageRating
          }
          // Update spam score to average (lower is better)
          existing.spamScore = Math.min(existing.spamScore, link.spamScore)
          // Update last crawled to most recent
          if (link.lastCrawled > existing.lastCrawled) {
            existing.lastCrawled = link.lastCrawled
          }
        } else {
          domainMap.set(link.domain, { ...link })
        }
      })

      // Sort by quality (spam filtering disabled for debugging)
      const result = Array.from(domainMap.values())
        .sort((a, b) => {
          // Sort by domain authority first, then by page authority
          if (b.domainRating !== a.domainRating) {
            return b.domainRating - a.domainRating
          }
          return b.pageRating - a.pageRating
        })
        .slice(0, 15) // Top 15 domains

      console.log(`🔍 Transformed backlink data:`, JSON.stringify(result, null, 2))
      console.log(`✅ MOZ backlink data fetched: ${result.length} domains, ${result.reduce((sum, link) => sum + link.links, 0)} total links`)
      
      return result

    } catch (error) {
      console.error('❌ Failed to fetch MOZ backlink data:', error)
      console.log('📊 Using mock backlink data due to API error')
      return this.getMockBacklinkData() // Use mock data for testing the enhanced UI
    }
  }

  private extractDomain(url: string): string {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  private categorizeLinkType(isNofollow: boolean, anchorText: string, pageTitle: string): string {
    const anchor = anchorText.toLowerCase()
    const title = pageTitle.toLowerCase()
    
    // Check for sponsored/paid content
    if (anchor.includes('sponsor') || anchor.includes('ad') || anchor.includes('promo') || 
        title.includes('sponsor') || title.includes('ad') || title.includes('promo')) {
      return 'Sponsored'
    }
    
    // Check for guest posts
    if (anchor.includes('guest') || anchor.includes('author') || anchor.includes('by ') ||
        title.includes('guest') || title.includes('author')) {
      return 'Guest Post'
    }
    
    // Check for directories and listings
    if (anchor.includes('directory') || anchor.includes('list') || anchor.includes('catalog') ||
        title.includes('directory') || title.includes('list') || title.includes('catalog')) {
      return 'Directory'
    }
    
    // Check for news and media
    if (anchor.includes('news') || anchor.includes('press') || anchor.includes('media') ||
        title.includes('news') || title.includes('press') || title.includes('media')) {
      return 'News/Media'
    }
    
    // Check for forums and communities
    if (anchor.includes('forum') || anchor.includes('discussion') || anchor.includes('community') ||
        title.includes('forum') || title.includes('discussion') || title.includes('community')) {
      return 'Forum'
    }
    
    // Check for backlink services (often low quality)
    if (title.includes('backlink') || title.includes('seo service') || title.includes('link building')) {
      return 'Backlink Service'
    }
    
    // Check for nofollow links
    if (isNofollow) {
      return 'Nofollow'
    }
    
    // Check for brand mentions
    if (anchor.includes('kitesafaris') || anchor.includes('kite safaris')) {
      return 'Brand Mention'
    }
    
    return 'Editorial'
  }

  private getMockBacklinkData(): MozBacklinkData[] {
    return [
      {
        domain: 'kitesurfingmag.com',
        links: 3,
        domainRating: 75,
        pageRating: 68,
        type: 'Editorial',
        url: 'https://kitesurfingmag.com/kitesafaris-review',
        title: 'KiteSafaris Review - Best Kiteboarding Destinations',
        anchorText: 'KiteSafaris',
        spamScore: 1,
        lastCrawled: '2025-01-15',
        dateFirstSeen: '2024-12-01',
        dateLastSeen: '2025-01-15',
        isNofollow: false,
        isRedirect: false,
        targetPage: 'kitesafaris.com/',
        targetDomain: 'kitesafaris.com',
        linkPropensity: 1500.5,
        pagesToDomain: 15000,
        rootDomainsToDomain: 500
      },
      {
        domain: 'travelblog.org',
        links: 2,
        domainRating: 65,
        pageRating: 58,
        type: 'Guest Post',
        url: 'https://travelblog.org/caribbean-kitesurfing',
        title: 'Caribbean Kitesurfing Adventures',
        anchorText: 'KiteSafaris Caribbean trips',
        spamScore: 2,
        lastCrawled: '2025-01-10',
        dateFirstSeen: '2024-11-15',
        dateLastSeen: '2025-01-10',
        isNofollow: false,
        isRedirect: false,
        targetPage: 'kitesafaris.com/',
        targetDomain: 'kitesafaris.com',
        linkPropensity: 1200.3,
        pagesToDomain: 12000,
        rootDomainsToDomain: 400
      }
    ]
  }
}

export const mozService = new MozService()
