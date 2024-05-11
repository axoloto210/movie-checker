import { RegisteredMovie } from '@/features/movieRegistration/MovieRegistrationForm'
import prisma from '@/lib/prisma'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export type RegisterMovieResult = {
  title: string
  siteURL: string
  image: string
  status: number
}

const schema = z.object({
  title: z.string(),
  siteURL: z.string(),
  image: z.string(),
  userEmail: z.string()
})

export async function POST(req: NextRequest) {
  try {
    const { title, siteURL, image, userEmail } = schema.parse(await req.json())

    const user = await getUserId(userEmail)
    if (user !== null) {
      createRegisteredMovie({ title, siteURL, image }, user.id)
    }

    const result: RegisterMovieResult = { title, siteURL, image, status: 200 }
    return Response.json(result)
  } catch (error) {
    console.log(error)
    return Response.json({ status: 500 })
  }
}

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
