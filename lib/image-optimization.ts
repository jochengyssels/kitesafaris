/**
 * Image Optimization Utilities for KiteSafaris.com
 * Provides SEO-optimized alt text generation and image optimization helpers
 */

export interface ImageOptimizationOptions {
  location?: string
  type?: 'hero' | 'destination' | 'equipment' | 'gallery' | 'team' | 'catamaran'
  action?: string
  brand?: string
  instructor?: string
}

/**
 * Generate SEO-optimized alt text for images
 */
export function generateAltText(options: ImageOptimizationOptions): string {
  const { location, type, action, brand, instructor } = options

  switch (type) {
    case 'hero':
      return `Luxury catamaran kitesurfing ${location || 'adventure'} kite safari`
    
    case 'destination':
      return `${location} kitesurfing spot aerial view luxury catamaran kitesurfing kite safari`
    
    case 'equipment':
      return `Professional kitesurfing equipment ${brand || 'premium gear'} luxury kite safari`
    
    case 'gallery':
      return `Kitesurfer ${action || 'jumping waves'} ${location} kite safari luxury catamaran kitesurfing`
    
    case 'team':
      return `IKO certified kite instructor ${instructor || 'professional coach'} luxury kite safari`
    
    case 'catamaran':
      return `Luxury catamaran interior kite safari accommodation ${location || 'premium vessel'}`
    
    default:
      return `Luxury kite safari ${location || 'adventure'} catamaran kitesurfing`
  }
}

/**
 * Generate responsive image sizes for different breakpoints
 */
export function getResponsiveSizes(context: 'hero' | 'gallery' | 'card' | 'thumbnail'): string {
  switch (context) {
    case 'hero':
      return '(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw'
    
    case 'gallery':
      return '(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw'
    
    case 'card':
      return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
    
    case 'thumbnail':
      return '(max-width: 640px) 25vw, (max-width: 768px) 20vw, 15vw'
    
    default:
      return '(max-width: 768px) 100vw, 50vw'
  }
}

/**
 * Generate WebP-optimized image URL
 * In production, this would convert images to WebP format
 */
export function getOptimizedImageUrl(originalUrl: string, quality: number = 85): string {
  // For Vercel blob storage, we can add optimization parameters
  if (originalUrl.includes('blob.vercel-storage.com')) {
    return `${originalUrl}?q=${quality}&f=webp`
  }
  
  // For local images, return as is (would be converted to WebP in build process)
  return originalUrl
}

/**
 * Generate blur data URL for loading placeholders
 */
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    // Create a simple gradient blur
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, '#f0f9ff')
    gradient.addColorStop(1, '#e0f2fe')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }
  
  return canvas.toDataURL()
}

/**
 * Image optimization presets for different use cases
 */
export const imagePresets = {
  hero: {
    quality: 90,
    priority: true,
    loading: 'eager' as const,
    sizes: getResponsiveSizes('hero'),
  },
  gallery: {
    quality: 85,
    priority: false,
    loading: 'lazy' as const,
    sizes: getResponsiveSizes('gallery'),
  },
  card: {
    quality: 80,
    priority: false,
    loading: 'lazy' as const,
    sizes: getResponsiveSizes('card'),
  },
  thumbnail: {
    quality: 75,
    priority: false,
    loading: 'lazy' as const,
    sizes: getResponsiveSizes('thumbnail'),
  },
}

/**
 * SEO keywords for image alt text
 */
export const seoKeywords = {
  primary: [
    'luxury kite safari',
    'catamaran kitesurfing',
    'small group kite vacation',
    'professional kite instruction',
  ],
  destinations: [
    'Caribbean kitesurfing',
    'Greece kitesurfing',
    'Sardinia kitesurfing',
    'Antigua kitesurfing',
  ],
  actions: [
    'kitesurfer jumping waves',
    'kiteboarding aerial maneuvers',
    'catamaran sailing',
    'luxury accommodation',
  ],
  equipment: [
    'professional kitesurfing equipment',
    'premium kite gear',
    'safety equipment',
    'IKO certified instruction',
  ],
}
