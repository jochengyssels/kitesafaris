import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kitesafaris.com'
  const lastmod = new Date().toISOString().split('T')[0]

  return [
    {
      url: baseUrl,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/destinations/antigua`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/destinations/greece`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/destinations/sardinia`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/antigua-kite-safari-december-6-2025`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/antigua-kite-safari-january-2026`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/antigua-kite-safari-february-2026`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: lastmod,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ]
}
