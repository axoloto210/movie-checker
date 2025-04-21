import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export type RegisterMovieResult = {
  movieId: number
  watched: boolean
  status: number
}

const schema = z.object({
  movieId: z.number(),
  watched: z.boolean(),
  userEmail: z.string()
})

export async function POST(req: NextRequest) {
  try {
    const { movieId, watched, userEmail } = schema.parse(await req.json())

    const user = await getUserId(userEmail)
    if (user !== null) {
      updateWatched({ movieId, watched }, user.id)
    }

    const result: RegisterMovieResult = {
      movieId,
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

async function updateWatched(
  movie: {
    movieId: number
    watched: boolean
  },
  authorId: string
) {
  const maxOrderMovie = await prisma.movie.findFirst({
    where: {
      authorId: authorId,
      watched: true
    },
    orderBy: {
      order: 'desc'
    }
  })

  const newOrder = maxOrderMovie ? (maxOrderMovie.order || 0) + 1 : 1

  await prisma.movie.update({
    where: {
      id: movie.movieId,
      authorId: authorId
    },
    data: {
      watched: movie.watched,
      order: newOrder
    }
  })
  return movie.movieId
}
