/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    //Next 14から非推奨に。
    //https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
    // domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com']
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  },
  // ----for develop----
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
  // -------------------
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
