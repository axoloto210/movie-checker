import { RegisteredMovie } from '@/features/movieRegistration/MovieRegistrationForm'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export type RegisterMovieResult = {
  title: string
  siteURL: string
  image: string
  watched: boolean
  status: number
}

const schema = z.object({
  title: z.string(),
  siteURL: z.string(),
  image: z.string(),
  watched: z.boolean(),
  userEmail: z.string(),
  watchedDate: z.string().nullable().optional(),
  plannedDate: z.string().nullable().optional()
})

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      siteURL,
      image,
      watched,
      userEmail,
      watchedDate,
      plannedDate
    } = schema.parse(await req.json())

    const user = await getUserId(userEmail)
    if (user !== null) {
      createRegisteredMovie(
        {
          title,
          siteURL,
          image,
          watched,
          watchedDate: watchedDate || undefined,
          plannedDate: plannedDate || undefined
        },
        user.id
      )
    }

    const result: RegisterMovieResult = {
      title,
      siteURL,
      image,
      watched,
      status: 200
    }
    revalidatePath('/mymovie') //みた映画情報を読み込み直す。
    revalidatePath('/watch-list') //みた映画情報を読み込み直す。
    revalidatePath('/mypage') //マイページのみた映画情報を読み込み直す。
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
      title: movie.title,
      siteURL: movie.siteURL,
      image: movie.image || null,
      watched: movie.watched || false,
      authorId,
      watchedDate: movie.watchedDate ? new Date(movie.watchedDate) : null,
      plannedDate: movie.plannedDate ? new Date(movie.plannedDate) : null
    }
  })
  return movie
}
