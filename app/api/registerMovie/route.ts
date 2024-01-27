import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { RegisteredMovie } from '@/app/features/movieRegistration/MovieRegistrationForm'
import { z } from 'zod'

export async function POST(req: NextRequest) {
  const schema = z.object({
    title: z.string(),
    siteURL: z.string(),
    image: z.string(),
    userEmail: z.string()
  })

  try {
    const { title, siteURL, image, userEmail } = schema.parse(await req.json())

    const user = await getUserId(userEmail)
    if (user !== null) {
      createRegisteredMovie({ title, siteURL, image }, user.id)
    }
    return Response.json({ title, siteURL, image, status: 200 })
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

async function createRegisteredMovie(movie: RegisteredMovie, authorId: string) {
  await prisma.movie.create({
    data: {
      ...movie,
      authorId
    }
  })
  return movie
}
