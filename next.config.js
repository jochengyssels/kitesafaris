/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Guide-related 404 redirects
      {
        source: '/guides/kite-spots',
        destination: '/guides/kite-spots',
        permanent: true,
      },
      {
        source: '/guides/packing-list',
        destination: '/guides/packing-list',
        permanent: true,
      },
      {
        source: '/guides/trade-winds',
        destination: '/guides/trade-winds',
        permanent: true,
      },
      {
        source: '/guides/catamaran-launching',
        destination: '/guides/catamaran-launching',
        permanent: true,
      },
      {
        source: '/guides/safety',
        destination: '/guides/safety',
        permanent: true,
      },
      {
        source: '/guides/upcoming-destinations',
        destination: '/guides/upcoming-destinations',
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
    ]
  },
}

module.exports = nextConfig
