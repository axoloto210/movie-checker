import { markMovieAsWatched } from '@/data/movies'
import { toErrorResponse } from '@/data/errors'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  movieId: z.number(),
  watchedDate: z.string().nullable().optional()
})

export async function POST(req: NextRequest) {
  try {
    const { movieId, watchedDate } = schema.parse(await req.json())
    await markMovieAsWatched(movieId, watchedDate)

    revalidatePath('/mymovie')
    revalidatePath('/watch-list')
    revalidatePath('/mypage')
    return Response.json({ movieId, status: 200 })
  } catch (error) {
    return toErrorResponse(error)
  }
}
