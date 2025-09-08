/**
 * Comprehensive Sitemap Generator for KiteSafaris.com
 * Generates XML sitemaps with proper priorities and structure
 */

export interface SitemapEntry {
  url: string
  lastmod: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
  images?: string[]
}

export interface SitemapCategory {
  name: string
  priority: number
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  pages: SitemapEntry[]
}

/**
 * Generate comprehensive sitemap data
 */
export function generateSitemapData(): SitemapCategory[] {
  const baseUrl = 'https://kitesafaris.com'
  const lastmod = new Date().toISOString().split('T')[0]

  return [
    {
      name: 'Main Pages',
      priority: 1.0,
      changefreq: 'weekly',
      pages: [
        {
          url: `${baseUrl}/`,
          lastmod,
          changefreq: 'weekly',
          priority: 1.0
        }
      ]
    },
    {
      name: 'Main Destination Pages',
      priority: 1.0,
      changefreq: 'weekly',
      pages: [
        {
          url: `${baseUrl}/destinations/antigua`,
          lastmod,
          changefreq: 'weekly',
          priority: 1.0
        },
        {
          url: `${baseUrl}/destinations/greece`,
          lastmod,
          changefreq: 'weekly',
          priority: 1.0
        },
        {
          url: `${baseUrl}/destinations/sardinia`,
          lastmod,
          changefreq: 'weekly',
          priority: 1.0
        }
      ]
    },
    {
      name: 'Booking and Packages',
      priority: 1.0,
      changefreq: 'weekly',
      pages: [
        {
          url: `${baseUrl}/booking`,
          lastmod,
          changefreq: 'weekly',
          priority: 1.0
        },
        {
          url: `${baseUrl}/packages`,
          lastmod,
          changefreq: 'weekly',
          priority: 1.0
        }
      ]
    },
    {
      name: 'Secondary Pages',
      priority: 0.8,
      changefreq: 'monthly',
      pages: [
        {
          url: `${baseUrl}/destinations`,
          lastmod,
          changefreq: 'weekly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/fleet`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/small-groups`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/expert-guides`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/premium-equipment`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/guaranteed-wind`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        }
      ]
    },
    {
      name: 'Trip Pages',
      priority: 0.8,
      changefreq: 'weekly',
      pages: [
        {
          url: `${baseUrl}/antigua-kite-safari-december-6-2025`,
          lastmod,
          changefreq: 'weekly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/antigua-kite-safari-january-2026`,
          lastmod,
          changefreq: 'weekly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/antigua-kite-safari-february-2026`,
          lastmod,
          changefreq: 'weekly',
          priority: 0.8
        }
      ]
    },
    {
      name: 'Destination Pages',
      priority: 0.8,
      changefreq: 'monthly',
      pages: [
        {
          url: `${baseUrl}/destinations/caribbean`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/destinations/barbados`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/destinations/croatia`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/destinations/dominican-republic`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/destinations/tobago`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/destinations/turks-and-caicos`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        }
      ]
    },
    {
      name: 'Sardinia Destination Pages',
      priority: 0.8,
      changefreq: 'monthly',
      pages: [
        {
          url: `${baseUrl}/destinations/sardinia/kitesurf-sardinia`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/destinations/sardinia/punta-trettu`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.8
        },
        {
          url: `${baseUrl}/destinations/sardinia/wind-conditions`,
          lastmod,
          changefreq: 'weekly',
          priority: 0.8
        }
      ]
    },
    {
      name: 'Content Pages',
      priority: 0.6,
      changefreq: 'weekly',
      pages: [
        {
          url: `${baseUrl}/guides`,
          lastmod,
          changefreq: 'weekly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/guides/caribbean-kite-cruises`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/guides/catamaran-launching`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/guides/kite-spots`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/guides/packing-list`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/guides/safety`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/guides/trade-winds`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/guides/upcoming-destinations`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        }
      ]
    },
    {
      name: 'Blog Pages',
      priority: 0.6,
      changefreq: 'weekly',
      pages: [
        {
          url: `${baseUrl}/blog`,
          lastmod,
          changefreq: 'weekly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/blog/best-flights-europe-antigua-kite-safaris`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/blog/caribbean-kiteboarding-wind-patterns`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/blog/kiteboarding-safety-tips-tropical-destinations`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/blog/kitesafaris-aba-kiting-partnership`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/blog/kitesafaris-kitehouse-sardinia-partnership`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/blog/kitesafaris-prokite-sardegna-partnership`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/blog/mediterranean-vs-caribbean-kiteboarding`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/blog/packing-checklist-kite-safari`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/blog/photography-tips-kiteboarding-adventure`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        }
      ]
    },
    {
      name: 'Gallery and Reviews',
      priority: 0.6,
      changefreq: 'monthly',
      pages: [
        {
          url: `${baseUrl}/gallery`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/destinations/gallery`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/reviews`,
          lastmod,
          changefreq: 'weekly',
          priority: 0.6
        },
        {
          url: `${baseUrl}/faq`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.6
        }
      ]
    },
    {
      name: 'Supporting Pages',
      priority: 0.4,
      changefreq: 'monthly',
      pages: [
        {
          url: `${baseUrl}/shop`,
          lastmod,
          changefreq: 'weekly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/contact`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/contact/kitehouse`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/contact/prokite`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/why-us`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/sardinian-awakening`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/flights-europe-antigua`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.4
        }
      ]
    },
    {
      name: 'Policy Pages',
      priority: 0.4,
      changefreq: 'yearly',
      pages: [
        {
          url: `${baseUrl}/policies/refund`,
          lastmod,
          changefreq: 'yearly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/policies/cancellation`,
          lastmod,
          changefreq: 'yearly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/policies/insurance`,
          lastmod,
          changefreq: 'yearly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/policies/safety`,
          lastmod,
          changefreq: 'yearly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/policies/privacy`,
          lastmod,
          changefreq: 'yearly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/terms`,
          lastmod,
          changefreq: 'yearly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/privacy`,
          lastmod,
          changefreq: 'yearly',
          priority: 0.4
        }
      ]
    },
    {
      name: 'Sardinia Special Pages',
      priority: 0.4,
      changefreq: 'monthly',
      pages: [
        {
          url: `${baseUrl}/destinations/sardinia/beginner-guide`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/destinations/sardinia/kitesurf-schools`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/destinations/sardinia/punta-trettu/kitesurf-lessons`,
          lastmod,
          changefreq: 'monthly',
          priority: 0.4
        },
        {
          url: `${baseUrl}/destinations/sardinia/punta-trettu/webcam`,
          lastmod,
          changefreq: 'daily',
          priority: 0.4
        },
        {
          url: `${baseUrl}/destinations/sardinia/punta-trettu-webcam`,
          lastmod,
          changefreq: 'daily',
          priority: 0.4
        }
      ]
    }
  ]
}

/**
 * Generate XML sitemap
 */
export function generateXMLSitemap(): string {
  const sitemapData = generateSitemapData()
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
  
  sitemapData.forEach(category => {
    category.pages.forEach(page => {
      xml += '  <url>\n'
      xml += `    <loc>${page.url}</loc>\n`
      xml += `    <lastmod>${page.lastmod}</lastmod>\n`
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`
      xml += `    <priority>${page.priority}</priority>\n`
      xml += '  </url>\n'
    })
  })
  
  xml += '</urlset>'
  
  return xml
}

/**
 * Generate sitemap index
 */
export function generateSitemapIndex(): string {
  const baseUrl = 'https://kitesafaris.com'
  const lastmod = new Date().toISOString().split('T')[0]
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  
  xml += '  <sitemap>\n'
  xml += `    <loc>${baseUrl}/sitemap.xml</loc>\n`
  xml += `    <lastmod>${lastmod}</lastmod>\n`
  xml += '  </sitemap>\n'
  
  xml += '  <sitemap>\n'
  xml += `    <loc>${baseUrl}/sitemap-images.xml</loc>\n`
  xml += `    <lastmod>${lastmod}</lastmod>\n`
  xml += '  </sitemap>\n'
  
  xml += '</sitemapindex>'
  
  return xml
}

/**
 * Generate mobile sitemap
 */
export function generateMobileSitemap(): string {
  const sitemapData = generateSitemapData()
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">\n'
  
  sitemapData.forEach(category => {
    category.pages.forEach(page => {
      xml += '  <url>\n'
      xml += `    <loc>${page.url}</loc>\n`
      xml += '    <mobile:mobile/>\n'
      xml += `    <lastmod>${page.lastmod}</lastmod>\n`
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`
      xml += `    <priority>${page.priority}</priority>\n`
      xml += '  </url>\n'
    })
  })
  
  xml += '</urlset>'
  
  return xml
}

/**
 * Generate video sitemap
 */
export function generateVideoSitemap(): string {
  const baseUrl = 'https://kitesafaris.com'
  const lastmod = new Date().toISOString().split('T')[0]
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n'
  
  // Add video pages
  const videoPages = [
    {
      url: `${baseUrl}/kiteboarding-video-thumbnail.png`,
      title: 'Kiteboarding Adventure Video',
      description: 'Luxury kite safari kiteboarding adventure video',
      thumbnail: `${baseUrl}/kiteboarding-video-thumbnail.png`,
      duration: 120
    },
    {
      url: `${baseUrl}/yacht-sunset-video.png`,
      title: 'Yacht Sunset Video',
      description: 'Luxury yacht sunset kite safari experience',
      thumbnail: `${baseUrl}/yacht-sunset-video.png`,
      duration: 90
    }
  ]
  
  videoPages.forEach(video => {
    xml += '  <url>\n'
    xml += `    <loc>${video.url}</loc>\n`
    xml += `    <lastmod>${lastmod}</lastmod>\n`
    xml += '    <video:video>\n'
    xml += `      <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>\n`
    xml += `      <video:title>${video.title}</video:title>\n`
    xml += `      <video:description>${video.description}</video:description>\n`
    xml += `      <video:duration>${video.duration}</video:duration>\n`
    xml += '      <video:publication_date>2024-12-19</video:publication_date>\n'
    xml += '      <video:category>Sports</video:category>\n'
    xml += '      <video:family_friendly>yes</video:family_friendly>\n'
    xml += '    </video:video>\n'
    xml += '  </url>\n'
  })
  
  xml += '</urlset>'
  
  return xml
}

/**
 * Generate news sitemap
 */
export function generateNewsSitemap(): string {
  const baseUrl = 'https://kitesafaris.com'
  const lastmod = new Date().toISOString().split('T')[0]
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n'
  
  // Add news pages (blog posts)
  const newsPages = [
    {
      url: `${baseUrl}/blog/best-flights-europe-antigua-kite-safaris`,
      title: 'Best Flights Europe Antigua Kite Safaris',
      publicationDate: '2024-12-19',
      keywords: 'flights, europe, antigua, kite safari, travel'
    },
    {
      url: `${baseUrl}/blog/caribbean-kiteboarding-wind-patterns`,
      title: 'Caribbean Kiteboarding Wind Patterns',
      publicationDate: '2024-12-18',
      keywords: 'caribbean, kiteboarding, wind, patterns, weather'
    },
    {
      url: `${baseUrl}/blog/kiteboarding-safety-tips-tropical-destinations`,
      title: 'Kiteboarding Safety Tips Tropical Destinations',
      publicationDate: '2024-12-17',
      keywords: 'kiteboarding, safety, tips, tropical, destinations'
    }
  ]
  
  newsPages.forEach(news => {
    xml += '  <url>\n'
    xml += `    <loc>${news.url}</loc>\n`
    xml += `    <lastmod>${lastmod}</lastmod>\n`
    xml += '    <news:news>\n'
    xml += '      <news:publication>\n'
    xml += '        <news:name>KiteSafaris Blog</news:name>\n'
    xml += '        <news:language>en</news:language>\n'
    xml += '      </news:publication>\n'
    xml += `      <news:publication_date>${news.publicationDate}</news:publication_date>\n`
    xml += `      <news:title>${news.title}</news:title>\n`
    xml += `      <news:keywords>${news.keywords}</news:keywords>\n`
    xml += '    </news:news>\n'
    xml += '  </url>\n'
  })
  
  xml += '</urlset>'
  
  return xml
}

/**
 * Export all sitemap functions
 */
export const SitemapGenerator = {
  generateSitemapData,
  generateXMLSitemap,
  generateSitemapIndex,
  generateMobileSitemap,
  generateVideoSitemap,
  generateNewsSitemap
}
