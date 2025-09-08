import { generateImageSitemapXML } from '@/lib/image-sitemap'

export async function GET() {
  const sitemapXML = generateImageSitemapXML()
  
  return new Response(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
    },
  })
}
