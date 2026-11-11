import { createMovie } from '@/data/movies'
import { toErrorResponse } from '@/data/errors'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { z } from 'zod'

export type RegisterMovieResult = {
  title: string
  watched: boolean
  status: number
}

const schema = z.object({
  title: z.string(),
  siteURL: z.string(),
  image: z.string().nullable().optional(),
  watched: z.boolean(),
  watchedDate: z.string().nullable().optional(),
  plannedDate: z.string().nullable().optional()
})

export async function POST(req: NextRequest) {
  try {
    const movie = await createMovie(schema.parse(await req.json()))

    revalidatePath('/mymovie')
    revalidatePath('/watch-list')
    revalidatePath('/mypage')
    return Response.json({
      title: movie.title,
      watched: movie.watched,
      status: 200
    } satisfies RegisterMovieResult)
  } catch (error) {
    return toErrorResponse(error)
  }
}
