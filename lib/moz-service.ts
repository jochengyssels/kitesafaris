interface MozBacklinkData {
  domain: string
  links: number
  domainRating: number
  type: string
  url: string
  title?: string
  anchorText?: string
  spamScore?: number
}

interface MozResponse {
  results: Array<{
    url: string
    title: string
    anchor_text: string
    spam_score: number
    domain_authority: number
    page_authority: number
    link_type: string
    source_url: string
    target_url: string
  }>
  meta: {
    total_results: number
    page: number
    per_page: number
  }
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
          sort: 'domain_authority',
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
      
      // Transform MOZ data to our format
      const backlinkData: MozBacklinkData[] = data.results.map(link => ({
        domain: this.extractDomain(link.source_url),
        links: 1, // Each result is one link
        domainRating: link.domain_authority,
        type: this.categorizeLinkType(link.link_type, link.anchor_text),
        url: link.source_url,
        title: link.title,
        anchorText: link.anchor_text,
        spamScore: link.spam_score
      }))

      // Group by domain and aggregate
      const domainMap = new Map<string, MozBacklinkData>()
      
      backlinkData.forEach(link => {
        const existing = domainMap.get(link.domain)
        if (existing) {
          existing.links += 1
          // Keep the highest domain rating
          if (link.domainRating > existing.domainRating) {
            existing.domainRating = link.domainRating
          }
        } else {
          domainMap.set(link.domain, { ...link })
        }
      })

      const result = Array.from(domainMap.values())
        .sort((a, b) => b.domainRating - a.domainRating)
        .slice(0, 10) // Top 10 domains

      console.log(`✅ MOZ backlink data fetched: ${result.length} domains, ${result.reduce((sum, link) => sum + link.links, 0)} total links`)
      
      return result

    } catch (error) {
      console.error('❌ Failed to fetch MOZ backlink data:', error)
      // Don't fall back to mock data - return empty array to indicate no data
      return []
    }
  }

  private extractDomain(url: string): string {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url
    }
  }

  private categorizeLinkType(linkType: string, anchorText: string): string {
    const anchor = anchorText.toLowerCase()
    
    if (anchor.includes('sponsor') || anchor.includes('ad') || anchor.includes('promo')) {
      return 'Sponsored'
    }
    
    if (anchor.includes('guest') || anchor.includes('author') || anchor.includes('by ')) {
      return 'Guest Post'
    }
    
    if (anchor.includes('directory') || anchor.includes('list') || anchor.includes('catalog')) {
      return 'Directory'
    }
    
    if (anchor.includes('news') || anchor.includes('press') || anchor.includes('media')) {
      return 'News/Media'
    }
    
    if (anchor.includes('forum') || anchor.includes('discussion') || anchor.includes('community')) {
      return 'Forum'
    }
    
    if (linkType === 'nofollow') {
      return 'Nofollow'
    }
    
    return 'Editorial'
  }

  private getMockBacklinkData(): MozBacklinkData[] {
    return [
      {
        domain: 'kitesurfingmag.com',
        links: 3,
        domainRating: 75,
        type: 'Editorial',
        url: 'https://kitesurfingmag.com/kitesafaris-review',
        title: 'KiteSafaris Review - Best Kiteboarding Destinations',
        anchorText: 'KiteSafaris'
      },
      {
        domain: 'travelblog.org',
        links: 2,
        domainRating: 65,
        type: 'Guest Post',
        url: 'https://travelblog.org/caribbean-kitesurfing',
        title: 'Caribbean Kitesurfing Adventures',
        anchorText: 'KiteSafaris Caribbean trips'
      },
      {
        domain: 'watersports.net',
        links: 4,
        domainRating: 60,
        type: 'Directory',
        url: 'https://watersports.net/directory/kitesurfing',
        title: 'Kitesurfing Schools Directory',
        anchorText: 'KiteSafaris'
      },
      {
        domain: 'sardinia-travel.com',
        links: 2,
        domainRating: 55,
        type: 'Editorial',
        url: 'https://sardinia-travel.com/kitesurfing-spots',
        title: 'Best Kitesurfing Spots in Sardinia',
        anchorText: 'KiteSafaris Sardinia'
      },
      {
        domain: 'antigua-guide.com',
        links: 1,
        domainRating: 50,
        type: 'Editorial',
        url: 'https://antigua-guide.com/activities',
        title: 'Antigua Activities Guide',
        anchorText: 'kitesurfing lessons'
      }
    ]
  }
}

export const mozService = new MozService()
