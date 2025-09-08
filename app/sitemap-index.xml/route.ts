import { generateSitemapIndex } from '@/lib/sitemap-generator'

export async function GET() {
  const sitemapXML = generateSitemapIndex()
  
  return new Response(sitemapXML, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 24 hours
    },
  })
}
