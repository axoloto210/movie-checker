import { updateMoviesOrder } from '@/data/movies'
import { toErrorResponse } from '@/data/errors'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  moviesOrder: z.array(
    z.object({
      id: z.number(),
      order: z.number()
    })
  )
})

export async function PUT(req: NextRequest) {
  try {
    const { moviesOrder } = schema.parse(await req.json())
    await updateMoviesOrder(moviesOrder)

    revalidatePath('/mymovie')
    revalidatePath('/watch-list')
    revalidatePath('/mypage')
    return Response.json({ status: 200 })
  } catch (error) {
    return toErrorResponse(error)
  }
}
