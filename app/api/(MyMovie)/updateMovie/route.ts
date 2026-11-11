import { updateMovie } from '@/data/movies'
import { toErrorResponse } from '@/data/errors'
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
    const { movieId, ...input } = schema.parse(await req.json())
    await updateMovie(movieId, input)

    revalidatePath('/mymovie')
    revalidatePath('/watch-list')
    revalidatePath('/mypage')
    return Response.json({ movieId, status: 200 } satisfies UpdateMovieResult)
  } catch (error) {
    return toErrorResponse(error)
  }
}
