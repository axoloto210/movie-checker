import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mymovie/', '/mypage/']
    },
    sitemap: 'https://www.movie-checker.com/sitemap.xml'
  }
}
