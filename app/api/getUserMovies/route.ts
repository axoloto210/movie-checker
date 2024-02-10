import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  try {
    const { userEmail } = await req.json()
    if (userEmail === undefined || userEmail === null) {
      throw new Error()
    }

    const user = await getUserId(userEmail)

    if (user !== null) {
      const userMovies = await getUserMovies(user.id)
      return Response.json({ userMovies, status: 200 })
    }
  } catch (error: unknown) {
    console.log(error)
    return Response.json({ status: 500 })
  }
}

const prisma = new PrismaClient()

async function getUserId(userEmail: string) {
  const userId = await prisma.user.findUnique({
    where: {
      email: userEmail
    },
    select: {
      id: true
    }
  })
  return userId
}

async function getUserMovies(userId: string) {
  const userMovies = await prisma.movie.findMany({
    where: {
      authorId: userId
    },
    select: {
      title: true,
      siteURL: true
    }
  })
  return userMovies
}
