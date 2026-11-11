import 'server-only'

import { UnauthorizedError } from '@/data/auth'
import { MovieNotFoundError } from '@/data/movies'
import { ZodError } from 'zod'

/** Maps Data Access Layer errors to Route Handler responses. */
export function toErrorResponse(error: unknown): Response {
  if (error instanceof UnauthorizedError) {
    return Response.json(
      { status: 401, message: 'Unauthorized' },
      { status: 401 }
    )
  }
  if (error instanceof ZodError) {
    return Response.json(
      { status: 400, message: 'Bad Request' },
      { status: 400 }
    )
  }
  if (error instanceof MovieNotFoundError) {
    return Response.json({ status: 404, message: 'Not Found' }, { status: 404 })
  }
  console.log(error)
  return Response.json(
    { status: 500, message: 'Internal Server Error' },
    { status: 500 }
  )
}
