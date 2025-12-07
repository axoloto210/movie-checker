import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
  images: {
    // Next 14から非推奨に。
    // https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
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
      fullUrl: true
    }
  }
  // -------------------
}

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

export default bundleAnalyzer(nextConfig)
