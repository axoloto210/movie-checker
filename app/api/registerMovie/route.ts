import { NextRequest } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { RegisteredMovie } from '@/app/components/feature/movieRegistration/MovieRegistrationForm'

export async function POST(req: NextRequest) {
  const { title, siteURL, image, userEmail } = await req.json()
  const user = await getUserId(userEmail)
  if (user !== null) {
    createRegisteredMovie({ title, siteURL, image }, user.id)
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
}
