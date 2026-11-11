import { deleteMovie } from '@/data/movies'
import { toErrorResponse } from '@/data/errors'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const movieIdSchema = z.coerce.number().int()

export async function DELETE(
  _req: NextRequest,
  props: { params: Promise<{ movieId: string }> }
) {
  try {
    const { movieId } = await props.params
    await deleteMovie(movieIdSchema.parse(movieId))

    revalidatePath('/mymovie')
    revalidatePath('/watch-list')
    revalidatePath('/mypage')
    return Response.json({ status: 200 })
  } catch (error) {
    return toErrorResponse(error)
  }
}
