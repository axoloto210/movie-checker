import prisma from '@/lib/prisma'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { nextCookies } from 'better-auth/next-js'
import { headers } from 'next/headers'

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }
  },
  // Server Actions から Cookie を設定できるようにする。plugins の最後に置く必要がある。
  plugins: [nextCookies()]
})

/**
 * Server Component / Route Handler / Server Action からセッションを取得します。
 * 未ログインの場合は null を返します。
 */
export const getSession = async () =>
  auth.api.getSession({ headers: await headers() })
