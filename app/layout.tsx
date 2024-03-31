import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const siteName = 'Movie Checker'
const description =
  'みた映画・みたい映画を管理しよう。Find your movie you watched or you want to watch.'
const url = 'https://movie-checker.com'

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: siteName,
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: `${url}/opengraph-image.jpg`
      }
    ]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
