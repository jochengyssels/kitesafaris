/**
 * Image Sitemap Generator for KiteSafaris.com
 * Generates structured data for better SEO indexing of images
 */

export interface ImageSitemapEntry {
  loc: string
  caption?: string
  geo_location?: string
  title?: string
  license?: string
}

export interface ImageSitemapData {
  images: ImageSitemapEntry[]
  lastmod: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

/**
 * Generate image sitemap entries for gallery images
 */
export function generateGalleryImageSitemap(): ImageSitemapEntry[] {
  const baseUrl = 'https://kitesafaris.com'
  
  return [
    // Antigua Images
    {
      loc: `${baseUrl}/antigua-aerial-harbor-view-new.jpg`,
      caption: 'Antigua aerial harbor view luxury kite safari Caribbean catamaran kitesurfing destination',
      geo_location: 'Antigua, Caribbean',
      title: 'Antigua Aerial Harbor View',
    },
    {
      loc: `${baseUrl}/antigua-caribbean-sunset-kiteboarding.png`,
      caption: 'Antigua Caribbean sunset kiteboarding luxury catamaran kite safari tropical paradise',
      geo_location: 'Antigua, Caribbean',
      title: 'Antigua Caribbean Sunset Kiteboarding',
    },
    {
      loc: `${baseUrl}/antigua-coral-reef-underwater-snorkeling.png`,
      caption: 'Antigua coral reef underwater snorkeling kite safari Caribbean marine life',
      geo_location: 'Antigua, Caribbean',
      title: 'Antigua Coral Reef Snorkeling',
    },
    {
      loc: `${baseUrl}/antigua-sunset-harbor-romantic.jpeg`,
      caption: 'Antigua sunset harbor romantic luxury catamaran kite safari Caribbean',
      geo_location: 'Antigua, Caribbean',
      title: 'Antigua Sunset Harbor',
    },
    {
      loc: `${baseUrl}/antigua-tropical-landscape-palm-trees-beach.png`,
      caption: 'Antigua tropical landscape palm trees beach kite safari Caribbean paradise',
      geo_location: 'Antigua, Caribbean',
      title: 'Antigua Tropical Landscape',
    },
    
    // Greece Images
    {
      loc: `${baseUrl}/greek-aegean-islands-kiteboarding-destination.png`,
      caption: 'Greek Aegean islands kiteboarding destination Mediterranean kite safari luxury catamaran',
      geo_location: 'Greece, Mediterranean',
      title: 'Greek Aegean Islands Kiteboarding',
    },
    {
      loc: `${baseUrl}/greek-aegean-islands-kiteboarding-meltemi-winds.png`,
      caption: 'Greek Aegean islands kiteboarding meltemi winds Mediterranean kite safari',
      geo_location: 'Greece, Mediterranean',
      title: 'Greek Meltemi Winds Kiteboarding',
    },
    
    // Sardinia Images
    {
      loc: `${baseUrl}/sardinia-punta-trettu-kiteboarding-mediterranean-c.png`,
      caption: 'Sardinia Punta Trettu kiteboarding Mediterranean kite safari luxury catamaran',
      geo_location: 'Sardinia, Italy',
      title: 'Sardinia Punta Trettu Kiteboarding',
    },
    {
      loc: `${baseUrl}/sardinian-beach-sunset-with-kitesurfer-silhouette-.png`,
      caption: 'Sardinian beach sunset kitesurfer silhouette Mediterranean kite safari',
      geo_location: 'Sardinia, Italy',
      title: 'Sardinian Beach Sunset',
    },
    
    // Luxury Catamaran Images
    {
      loc: `${baseUrl}/luxury-catamaran-yacht-on-turquoise-water.png`,
      caption: 'Luxury catamaran yacht turquoise water kite safari premium vessel',
      geo_location: 'Caribbean',
      title: 'Luxury Catamaran Yacht',
    },
    {
      loc: `${baseUrl}/luxury-yacht-on-turquoise-ocean-water.png`,
      caption: 'Luxury yacht turquoise ocean water kite safari premium accommodation',
      geo_location: 'Caribbean',
      title: 'Luxury Yacht Ocean',
    },
    {
      loc: `${baseUrl}/luxury-yacht-sunset-welcome.png`,
      caption: 'Luxury yacht sunset welcome kite safari premium experience',
      geo_location: 'Caribbean',
      title: 'Luxury Yacht Sunset Welcome',
    },
    {
      loc: `${baseUrl}/modern-catamaran-sailing-yacht-with-kite-equipment.png`,
      caption: 'Modern catamaran sailing yacht kite equipment luxury kite safari',
      geo_location: 'Caribbean',
      title: 'Modern Catamaran with Kite Equipment',
    },
    {
      loc: `${baseUrl}/private-yacht-champagne-welcome.png`,
      caption: 'Private yacht champagne welcome luxury kite safari premium service',
      geo_location: 'Caribbean',
      title: 'Private Yacht Champagne Welcome',
    },
    
    // Kiteboarding Action Images
    {
      loc: `${baseUrl}/advanced-kiteboarding-jumping.png`,
      caption: 'Advanced kiteboarding jumping luxury kite safari professional kitesurfing',
      geo_location: 'Caribbean',
      title: 'Advanced Kiteboarding Jumping',
    },
    {
      loc: `${baseUrl}/kiteboarding-in-perfect-wind-conditions-with-blue-.png`,
      caption: 'Kiteboarding perfect wind conditions blue water luxury kite safari',
      geo_location: 'Caribbean',
      title: 'Perfect Wind Conditions Kiteboarding',
    },
    {
      loc: `${baseUrl}/kiteboarding-lesson-turquoise-water.png`,
      caption: 'Kiteboarding lesson turquoise water luxury kite safari professional instruction',
      geo_location: 'Caribbean',
      title: 'Kiteboarding Lesson',
    },
    {
      loc: `${baseUrl}/group-kiteboarding-session.png`,
      caption: 'Group kiteboarding session luxury kite safari small group experience',
      geo_location: 'Caribbean',
      title: 'Group Kiteboarding Session',
    },
    {
      loc: `${baseUrl}/small-group-kiteboarding-lesson-on-luxury-catamara.png`,
      caption: 'Small group kiteboarding lesson luxury catamaran kite safari premium experience',
      geo_location: 'Caribbean',
      title: 'Small Group Kiteboarding Lesson',
    },
    
    // Professional Team Images
    {
      loc: `${baseUrl}/authentic-portrait-of-kite-instructor-on-beach-in-.png`,
      caption: 'Authentic portrait kite instructor beach luxury kite safari professional coaching',
      geo_location: 'Caribbean',
      title: 'Kite Instructor Portrait',
    },
    {
      loc: `${baseUrl}/professional-kiteboarding-instructor-teaching-on-b.png`,
      caption: 'Professional kiteboarding instructor teaching beach luxury kite safari',
      geo_location: 'Caribbean',
      title: 'Professional Kiteboarding Instructor',
    },
    {
      loc: `${baseUrl}/professional-kiteboarding-instructor-teaching-on-t.png`,
      caption: 'Professional kiteboarding instructor teaching turquoise water kite safari',
      geo_location: 'Caribbean',
      title: 'Professional Instructor Teaching',
    },
    {
      loc: `${baseUrl}/captain-alex-portrait.png`,
      caption: 'Captain Alex portrait luxury kite safari professional crew',
      geo_location: 'Caribbean',
      title: 'Captain Alex Portrait',
    },
    {
      loc: `${baseUrl}/captain-enricco-portrait.jpg`,
      caption: 'Captain Enricco portrait luxury kite safari professional crew',
      geo_location: 'Mediterranean',
      title: 'Captain Enricco Portrait',
    },
    {
      loc: `${baseUrl}/chef-marco-portrait.png`,
      caption: 'Chef Marco portrait luxury kite safari premium dining experience',
      geo_location: 'Caribbean',
      title: 'Chef Marco Portrait',
    },
    {
      loc: `${baseUrl}/guide-amara-portrait.png`,
      caption: 'Guide Amara portrait luxury kite safari professional guide',
      geo_location: 'Caribbean',
      title: 'Guide Amara Portrait',
    },
    {
      loc: `${baseUrl}/instructor-maya-portrait.png`,
      caption: 'Instructor Maya portrait luxury kite safari professional coaching',
      geo_location: 'Caribbean',
      title: 'Instructor Maya Portrait',
    },
    
    // Equipment and Safety Images
    {
      loc: `${baseUrl}/kiteboarding-equipment-selection.png`,
      caption: 'Kiteboarding equipment selection luxury kite safari premium gear',
      geo_location: 'Caribbean',
      title: 'Kiteboarding Equipment Selection',
    },
    {
      loc: `${baseUrl}/premium-kiteboarding-equipment-on-luxury-yacht-dec.png`,
      caption: 'Premium kiteboarding equipment luxury yacht deck kite safari',
      geo_location: 'Caribbean',
      title: 'Premium Kiteboarding Equipment',
    },
    {
      loc: `${baseUrl}/tropical-kiteboarding-safety.png`,
      caption: 'Tropical kiteboarding safety luxury kite safari professional safety standards',
      geo_location: 'Caribbean',
      title: 'Tropical Kiteboarding Safety',
    },
    
    // Destination Images
    {
      loc: `${baseUrl}/secluded-kiteboarding-lagoon.png`,
      caption: 'Secluded kiteboarding lagoon luxury kite safari private spot',
      geo_location: 'Caribbean',
      title: 'Secluded Kiteboarding Lagoon',
    },
    {
      loc: `${baseUrl}/tropical-kiteboarding-destination-with-crystal-cle.png`,
      caption: 'Tropical kiteboarding destination crystal clear water luxury kite safari',
      geo_location: 'Caribbean',
      title: 'Tropical Kiteboarding Destination',
    },
    {
      loc: `${baseUrl}/perfect-wind-conditions-for-kiteboarding-in-tropic.png`,
      caption: 'Perfect wind conditions kiteboarding tropical luxury kite safari',
      geo_location: 'Caribbean',
      title: 'Perfect Wind Conditions',
    },
    
    // Experience Images
    {
      loc: `${baseUrl}/group-welcome-dinner-yacht.png`,
      caption: 'Group welcome dinner yacht luxury kite safari premium dining',
      geo_location: 'Caribbean',
      title: 'Group Welcome Dinner',
    },
    {
      loc: `${baseUrl}/custom-arrival-experience.png`,
      caption: 'Custom arrival experience luxury kite safari premium service',
      geo_location: 'Caribbean',
      title: 'Custom Arrival Experience',
    },
    
    // Photography and Media
    {
      loc: `${baseUrl}/kiteboarding-photography-tips.png`,
      caption: 'Kiteboarding photography tips luxury kite safari adventure photography',
      geo_location: 'Caribbean',
      title: 'Kiteboarding Photography Tips',
    },
    {
      loc: `${baseUrl}/kiteboarding-video-thumbnail.png`,
      caption: 'Kiteboarding video thumbnail luxury kite safari adventure video',
      geo_location: 'Caribbean',
      title: 'Kiteboarding Video',
    },
    {
      loc: `${baseUrl}/yacht-sunset-video.png`,
      caption: 'Yacht sunset video luxury kite safari premium experience',
      geo_location: 'Caribbean',
      title: 'Yacht Sunset Video',
    },
  ]
}

/**
 * Generate image sitemap entries for destination images
 */
export function generateDestinationImageSitemap(): ImageSitemapEntry[] {
  const baseUrl = 'https://kitesafaris.com'
  
  return [
    {
      loc: `${baseUrl}/destinations/antigua/hero.jpg`,
      caption: 'Antigua kitesurfing spot aerial view luxury catamaran kitesurfing kite safari',
      geo_location: 'Antigua, Caribbean',
      title: 'Antigua Kitesurfing Destination',
    },
    {
      loc: `${baseUrl}/destinations/greece/hero.jpg`,
      caption: 'Greece kitesurfing spot aerial view luxury catamaran kitesurfing kite safari',
      geo_location: 'Greece, Mediterranean',
      title: 'Greece Kitesurfing Destination',
    },
    {
      loc: `${baseUrl}/destinations/sardinia/hero.jpg`,
      caption: 'Sardinia kitesurfing spot aerial view luxury catamaran kitesurfing kite safari',
      geo_location: 'Sardinia, Italy',
      title: 'Sardinia Kitesurfing Destination',
    },
  ]
}

/**
 * Generate complete image sitemap data
 */
export function generateImageSitemap(): ImageSitemapData {
  const galleryImages = generateGalleryImageSitemap()
  const destinationImages = generateDestinationImageSitemap()
  
  return {
    images: [...galleryImages, ...destinationImages],
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8,
  }
}

/**
 * Generate XML sitemap for images
 */
export function generateImageSitemapXML(): string {
  const sitemapData = generateImageSitemap()
  const baseUrl = 'https://kitesafaris.com'
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'
  
  // Add main pages with their images
  const pages = [
    { url: '/', images: sitemapData.images.slice(0, 3) },
    { url: '/gallery', images: sitemapData.images.slice(0, 6) },
    { url: '/destinations', images: sitemapData.images.slice(3, 6) },
    { url: '/destinations/antigua', images: sitemapData.images.filter(img => img.geo_location?.includes('Antigua')) },
    { url: '/destinations/greece', images: sitemapData.images.filter(img => img.geo_location?.includes('Greece')) },
    { url: '/destinations/sardinia', images: sitemapData.images.filter(img => img.geo_location?.includes('Sardinia')) },
  ]
  
  pages.forEach(page => {
    xml += '  <url>\n'
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`
    xml += `    <lastmod>${sitemapData.lastmod}</lastmod>\n`
    xml += `    <changefreq>${sitemapData.changefreq}</changefreq>\n`
    xml += `    <priority>${sitemapData.priority}</priority>\n`
    
    page.images.forEach(image => {
      xml += '    <image:image>\n'
      xml += `      <image:loc>${image.loc}</image:loc>\n`
      if (image.caption) {
        xml += `      <image:caption>${image.caption}</image:caption>\n`
      }
      if (image.title) {
        xml += `      <image:title>${image.title}</image:title>\n`
      }
      if (image.geo_location) {
        xml += `      <image:geo_location>${image.geo_location}</image:geo_location>\n`
      }
      xml += '    </image:image>\n'
    })
    
    xml += '  </url>\n'
  })
  
  xml += '</urlset>'
  
  return xml
}

/**
 * Generate JSON-LD structured data for images
 */
export function generateImageStructuredData(): object {
  const sitemapData = generateImageSitemap()
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'KiteSafaris Gallery',
    description: 'Luxury kite safari and catamaran kitesurfing images from Caribbean, Greece, and Sardinia',
    url: 'https://kitesafaris.com/gallery',
    image: sitemapData.images.map(img => ({
      '@type': 'ImageObject',
      url: img.loc,
      caption: img.caption,
      name: img.title,
      contentLocation: img.geo_location ? {
        '@type': 'Place',
        name: img.geo_location
      } : undefined,
    })),
    publisher: {
      '@type': 'Organization',
      name: 'KiteSafaris',
      url: 'https://kitesafaris.com',
    },
  }
}
