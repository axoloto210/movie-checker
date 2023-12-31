import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  //認証情報をconsole上で確認したい場合にはtrueに設定。
  //debug: true,

  //session: { strategy: 'jwt' },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma)
}
