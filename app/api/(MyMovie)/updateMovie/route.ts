import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export type UpdateMovieResult = {
  movieId: number
  status: number
}

const schema = z.object({
  movieId: z.number(),
  title: z.string(),
  siteURL: z.string(),
  image: z.string().nullable().optional(),
  watchedDate: z.string().nullable().optional(),
  plannedDate: z.string().nullable().optional()
})

export async function POST(req: NextRequest) {
  try {
    const { movieId, title, siteURL, image, watchedDate, plannedDate } =
      schema.parse(await req.json())

    await prisma.movie.update({
      where: {
        id: movieId
      },
      data: {
        title,
        siteURL,
        image: image || null,
        watchedDate: watchedDate ? new Date(watchedDate) : null,
        plannedDate: plannedDate ? new Date(plannedDate) : null
      }
    })

    const result: UpdateMovieResult = {
      movieId,
      status: 200
    }
    revalidatePath('/mymovie')
    revalidatePath('/watch-list')
    revalidatePath('/mypage')
    return Response.json(result)
  } catch (error) {
    return Response.json({ status: 500 })
  }
}
