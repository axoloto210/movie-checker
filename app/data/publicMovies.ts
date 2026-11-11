import 'server-only'

import {
  PublicMovie,
  toPublicMovies
} from '@/features/public-movie/publicMovie'
import prisma from '@/lib/prisma'

const orderByPublicationDate = [
  { publicationDate: { sort: 'desc', nulls: 'last' } }
] as const

/** Public movies are shared data and do not require sign-in. */
export async function getAllPublicMovies(): Promise<PublicMovie[]> {
  const rawPublicMovies = await prisma.publicMovie.findMany({
    orderBy: [...orderByPublicationDate]
  })
  return toPublicMovies(rawPublicMovies)
}

export async function searchPublicMoviesByTitle(
  title: string
): Promise<PublicMovie[]> {
  const rawPublicMovies = await prisma.publicMovie.findMany({
    where: { title: { contains: title } },
    orderBy: [...orderByPublicationDate]
  })
  return toPublicMovies(rawPublicMovies)
}
