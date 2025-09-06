/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kitesafaris.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.kitesafaris.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pixabay.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      // Guide-related 404 redirects (removed self-redirects)
      // Caribbean kite cruises guide redirects (removed self-redirect)
      {
        source: '/guide/caribbean-kite-cruises',
        destination: '/guides/caribbean-kite-cruises',
        permanent: true,
      },
      {
        source: '/blog/caribbean-kite-cruises',
        destination: '/guides/caribbean-kite-cruises',
        permanent: true,
      },
      // Alternative guide URLs that might be linked
      {
        source: '/guide/kite-spots',
        destination: '/guides/kite-spots',
        permanent: true,
      },
      {
        source: '/guide/packing-list',
        destination: '/guides/packing-list',
        permanent: true,
      },
      {
        source: '/guide/trade-winds',
        destination: '/guides/trade-winds',
        permanent: true,
      },
      {
        source: '/guide/catamaran-launching',
        destination: '/guides/catamaran-launching',
        permanent: true,
      },
      {
        source: '/guide/safety',
        destination: '/guides/safety',
        permanent: true,
      },
      {
        source: '/guide/upcoming-destinations',
        destination: '/guides/upcoming-destinations',
        permanent: true,
      },
      // Blog-related 404 redirects (if they exist)
      {
        source: '/blog/kite-spots',
        destination: '/guides/kite-spots',
        permanent: true,
      },
      {
        source: '/blog/packing-list',
        destination: '/guides/packing-list',
        permanent: true,
      },
      {
        source: '/blog/trade-winds',
        destination: '/guides/trade-winds',
        permanent: true,
      },
      {
        source: '/blog/catamaran-launching',
        destination: '/guides/catamaran-launching',
        permanent: true,
      },
      {
        source: '/blog/safety',
        destination: '/guides/safety',
        permanent: true,
      },
      {
        source: '/blog/upcoming-destinations',
        destination: '/guides/upcoming-destinations',
        permanent: true,
      },
      // Destination redirects for SEO keywords (removed self-redirects)
      // Punta Trettu redirects for common variants/misspellings
      { source: '/punta-trettu', destination: '/destinations/sardinia/punta-trettu', permanent: true },
      { source: '/destinations/punta-trettu', destination: '/destinations/sardinia/punta-trettu', permanent: true },
      { source: '/destinations/sardinia/puntatrettu', destination: '/destinations/sardinia/punta-trettu', permanent: true },
      { source: '/sardinia/punta-trettu', destination: '/destinations/sardinia/punta-trettu', permanent: true },
      // Webcam aliases
      { source: '/punta-trettu/webcam', destination: '/destinations/sardinia/punta-trettu/webcam', permanent: true },
      { source: '/destinations/punta-trettu/webcam', destination: '/destinations/sardinia/punta-trettu/webcam', permanent: true },
      { source: '/sardinia/punta-trettu/webcam', destination: '/destinations/sardinia/punta-trettu/webcam', permanent: true },
      // Lessons aliases
      { source: '/punta-trettu/lessons', destination: '/destinations/sardinia/punta-trettu/kitesurf-lessons', permanent: true },
      { source: '/destinations/punta-trettu/lessons', destination: '/destinations/sardinia/punta-trettu/kitesurf-lessons', permanent: true },
      { source: '/sardinia/punta-trettu/lessons', destination: '/destinations/sardinia/punta-trettu/kitesurf-lessons', permanent: true },
      { source: '/punta-trettu/kitesurf-lessons', destination: '/destinations/sardinia/punta-trettu/kitesurf-lessons', permanent: true },
      { source: '/destinations/punta-trettu/kitesurf-lessons', destination: '/destinations/sardinia/punta-trettu/kitesurf-lessons', permanent: true },
      { source: '/sardinia/punta-trettu/kitesurf-lessons', destination: '/destinations/sardinia/punta-trettu/kitesurf-lessons', permanent: true },
      // Alternative destination URLs
      {
        source: '/destination/dominican-republic',
        destination: '/destinations/dominican-republic',
        permanent: true,
      },
      {
        source: '/destination/turks-and-caicos',
        destination: '/destinations/turks-and-caicos',
        permanent: true,
      },
      {
        source: '/destination/barbados',
        destination: '/destinations/barbados',
        permanent: true,
      },
      {
        source: '/destination/tobago',
        destination: '/destinations/tobago',
        permanent: true,
      },
      {
        source: '/destination/croatia',
        destination: '/destinations/croatia',
        permanent: true,
      },
      // Legacy URL redirects for common misspellings
      {
        source: '/destinations/dominican-rep',
        destination: '/destinations/dominican-republic',
        permanent: true,
      },
      {
        source: '/destinations/turks-caicos',
        destination: '/destinations/turks-and-caicos',
        permanent: true,
      },
      {
        source: '/destinations/turksandcaicos',
        destination: '/destinations/turks-and-caicos',
        permanent: true,
      },
      // Keyword-based redirects for SEO
      {
        source: '/kitesurfing-dominican-republic',
        destination: '/destinations/dominican-republic',
        permanent: true,
      },
      {
        source: '/kitesurf-turks-and-caicos',
        destination: '/destinations/turks-and-caicos',
        permanent: true,
      },
      {
        source: '/barbados-kiteboarding-season',
        destination: '/destinations/barbados',
        permanent: true,
      },
      {
        source: '/kitesurf-tobago',
        destination: '/destinations/tobago',
        permanent: true,
      },
      {
        source: '/kitesurf-croatia',
        destination: '/destinations/croatia',
        permanent: true,
      },
      {
        source: '/caribbean-kite-cruises',
        destination: '/guides/caribbean-kite-cruises',
        permanent: true,
      },
      {
        source: '/caribbean-catamaran-cruises',
        destination: '/guides/caribbean-kite-cruises',
        permanent: true,
      },
      {
        source: '/caribbean-catamaran-cruise',
        destination: '/guides/caribbean-kite-cruises',
        permanent: true,
      },
      {
        source: '/caribbean-catamaran',
        destination: '/guides/caribbean-kite-cruises',
        permanent: true,
      },
      {
        source: '/kitesurf-caribbean',
        destination: '/guides/caribbean-kite-cruises',
        permanent: true,
      },
      {
        source: '/kitesurfing-caribbean',
        destination: '/guides/caribbean-kite-cruises',
        permanent: true,
      },
      {
        source: '/kiteboarding-caribbean',
        destination: '/guides/caribbean-kite-cruises',
        permanent: true,
      },
      {
        source: '/caribbean-racing-catamaran-excursion',
        destination: '/guides/caribbean-kite-cruises',
        permanent: true,
      },
      {
        source: '/caribbean-kite-cruise',
        destination: '/guides/caribbean-kite-cruises',
        permanent: true,
      },
      {
        source: '/kiteboard-grace-bay',
        destination: '/destinations/turks-and-caicos',
        permanent: true,
      },
      {
        source: '/kiteboard-grace-bay-turks-and-caicos',
        destination: '/destinations/turks-and-caicos',
        permanent: true,
      },
      {
        source: '/kiteboarding-antigua',
        destination: '/destinations/antigua',
        permanent: true,
      },
      {
        source: '/kitesurf-antigua',
        destination: '/destinations/antigua',
        permanent: true,
      },
      {
        source: '/kitesurfing-greece',
        destination: '/destinations/greece',
        permanent: true,
      },
      {
        source: '/cyclades-kitesurfing',
        destination: '/destinations/greece',
        permanent: true,
      },
      {
        source: '/kite-and-sail-greece',
        destination: '/destinations/greece',
        permanent: true,
      },
      {
        source: '/kitesurfing-tours-greece',
        destination: '/destinations/greece',
        permanent: true,
      },
      {
        source: '/kite-progression-in-greece',
        destination: '/destinations/greece',
        permanent: true,
      },
      {
        source: '/kiteboarding-lessons-in-greece',
        destination: '/destinations/greece',
        permanent: true,
      },
      {
        source: '/kitesurf-experience-in-greece',
        destination: '/destinations/greece',
        permanent: true,
      },
      {
        source: '/kitesurf-packages',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/kite-catamaran',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/catamaran-kite',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/kite-cruise-italy',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/wing-foil-holiday',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/kite-and-sail-italy',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/kitesurfing-catamaran',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/kite-cruise-spain',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/womens-only-kiteboarding-trip',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/kite-adventures',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/kitesurfing-trips',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/kiteboarding-vacations',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/kitesurfing-vacation',
        destination: '/packages',
        permanent: true,
      },
      {
        source: '/north-juice-2018-wind-range',
        destination: '/guides',
        permanent: true,
      },
      {
        source: '/turkish-airlines-kiteboarding-equipment',
        destination: '/guides',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
