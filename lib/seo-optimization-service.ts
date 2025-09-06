import { Metadata } from "next"

export interface SEOOptimization {
  page: string
  title: string
  description: string
  keywords: string[]
  headings: {
    h1: string
    h2: string[]
    h3: string[]
  }
  content: {
    introduction: string
    sections: string[]
    conclusion: string
  }
  internalLinks: string[]
  schema: any
}

export interface KeywordMapping {
  keyword: string
  targetPages: string[]
  priority: 'high' | 'medium' | 'low'
  difficulty: 'easy' | 'medium' | 'hard'
  searchVolume: 'high' | 'medium' | 'low'
}

export class SEOOptimizationService {
  private readonly keywordMappings: KeywordMapping[] = [
    // High Priority Keywords
    { keyword: 'kitesurfing dominican republic', targetPages: ['/destinations/dominican-republic'], priority: 'high', difficulty: 'medium', searchVolume: 'medium' },
    { keyword: 'kitesurf turks and caicos', targetPages: ['/destinations/turks-and-caicos'], priority: 'high', difficulty: 'medium', searchVolume: 'medium' },
    { keyword: 'kitesurf antigua', targetPages: ['/destinations/antigua'], priority: 'high', difficulty: 'easy', searchVolume: 'high' },
    { keyword: 'caribbean catamaran', targetPages: ['/', '/destinations', '/packages'], priority: 'high', difficulty: 'easy', searchVolume: 'high' },
    { keyword: 'catamaran cruises caribbean', targetPages: ['/packages', '/destinations'], priority: 'high', difficulty: 'medium', searchVolume: 'medium' },
    
    // Medium Priority Keywords
    { keyword: 'kitesurf caribbean', targetPages: ['/', '/destinations'], priority: 'medium', difficulty: 'easy', searchVolume: 'high' },
    { keyword: 'kitesurfing caribbean', targetPages: ['/', '/destinations'], priority: 'medium', difficulty: 'easy', searchVolume: 'high' },
    { keyword: 'kiteboarding caribbean', targetPages: ['/', '/destinations'], priority: 'medium', difficulty: 'easy', searchVolume: 'high' },
    { keyword: 'kitesurf packages', targetPages: ['/packages', '/booking'], priority: 'medium', difficulty: 'easy', searchVolume: 'medium' },
    { keyword: 'kitesurfing trips', targetPages: ['/packages', '/destinations'], priority: 'medium', difficulty: 'easy', searchVolume: 'medium' },
  ]

  generateSEOOptimization(page: string, targetKeywords: string[]): SEOOptimization {
    const pageOptimizations: Record<string, SEOOptimization> = {
      '/': {
        page: '/',
        title: 'Caribbean Kite Safari | Luxury Catamaran Kiteboarding Adventures | KiteSafaris',
        description: 'Experience the ultimate Caribbean kite safari on luxury catamarans. Expert kiteboarding coaching, small groups, guaranteed wind. Book your kitesurf adventure today!',
        keywords: ['caribbean catamaran', 'kitesurf caribbean', 'kitesurfing caribbean', 'kiteboarding caribbean', 'kitesurf packages'],
        headings: {
          h1: 'Caribbean Kite Safari Adventures',
          h2: [
            'Luxury Catamaran Kiteboarding Trips',
            'Expert Kitesurf Coaching',
            'Caribbean Kitesurfing Destinations',
            'All-Inclusive Kite Packages'
          ],
          h3: [
            'Why Choose KiteSafaris',
            'Caribbean Kitesurfing Conditions',
            'Catamaran Accommodations',
            'Kiteboarding Safety'
          ]
        },
        content: {
          introduction: 'Discover the ultimate Caribbean kite safari experience with KiteSafaris. Our luxury catamaran kiteboarding adventures combine world-class kitesurfing with premium accommodations and expert coaching.',
          sections: [
            'Our Caribbean catamaran kiteboarding trips offer the perfect blend of adventure and luxury. Experience the best kitesurfing conditions in the Caribbean while staying on our premium catamarans.',
            'With expert kiteboarding coaching and small group sizes, you\'ll improve your kitesurfing skills while exploring the most beautiful Caribbean destinations.',
            'Our all-inclusive kitesurf packages include everything you need for the perfect Caribbean kiteboarding vacation.'
          ],
          conclusion: 'Ready to experience the ultimate Caribbean kite safari? Book your luxury catamaran kiteboarding adventure today and discover why KiteSafaris is the premier choice for kitesurfing in the Caribbean.'
        },
        internalLinks: ['/destinations', '/packages', '/booking', '/destinations/antigua'],
        schema: {
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "KiteSafaris",
          "description": "Luxury Caribbean kite safari adventures on catamarans",
          "url": "https://kitesafaris.com",
          "serviceType": "Kiteboarding Adventures",
          "areaServed": "Caribbean"
        }
      }
    }

    return pageOptimizations[page] || this.generateDefaultOptimization(page, targetKeywords)
  }

  private generateDefaultOptimization(page: string, targetKeywords: string[]): SEOOptimization {
    return {
      page,
      title: `${targetKeywords[0]} | KiteSafaris`,
      description: `Discover ${targetKeywords[0]} with KiteSafaris. Expert kiteboarding adventures and luxury catamaran trips.`,
      keywords: targetKeywords,
      headings: {
        h1: targetKeywords[0],
        h2: [`${targetKeywords[0]} Adventures`, 'Expert Coaching', 'Luxury Accommodations'],
        h3: ['Best Conditions', 'Safety First', 'Book Today']
      },
      content: {
        introduction: `Experience the best ${targetKeywords[0]} with KiteSafaris.`,
        sections: [
          `Our ${targetKeywords[0]} adventures offer world-class conditions.`,
          'Expert coaching and luxury accommodations included.',
          'Book your adventure today!'
        ],
        conclusion: `Ready for ${targetKeywords[0]}? Book now!`
      },
      internalLinks: ['/', '/destinations', '/packages'],
      schema: {
        "@context": "https://schema.org",
        "@type": "TravelEvent",
        "name": targetKeywords[0],
        "description": `KiteSafaris ${targetKeywords[0]} adventures`
      }
    }
  }

  getKeywordMappings(): KeywordMapping[] {
    return this.keywordMappings
  }

  getKeywordsForPage(page: string): string[] {
    return this.keywordMappings
      .filter(mapping => mapping.targetPages.includes(page))
      .map(mapping => mapping.keyword)
  }
}

export const seoOptimizationService = new SEOOptimizationService()