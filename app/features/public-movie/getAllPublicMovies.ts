import { PublicMovie as RawPublicMovie } from '@prisma/client'
import prisma from 'app/lib/prisma'

const getFormattedDate = (date: Date) => date.toLocaleDateString()

export const makePublicMovieFromRawPublicMovies = (
  rawPublicMovies: RawPublicMovie[]
): PublicMovie[] => {
  return rawPublicMovies.map((rawPublicMovie) => {
    return {
      ...rawPublicMovie,
      siteURL: rawPublicMovie.siteURL ?? '',
      publicationDate: rawPublicMovie.publicationDate
        ? getFormattedDate(rawPublicMovie.publicationDate)
        : 'NO_DATA'
    }
  })
}

export type PublicMovie = {
  id: number
  title: string
  siteURL: string
  image: string | null
  publicationDate: string
}

export async function getAllPublicMovies(): Promise<PublicMovie[]> {
  const rawPublicMovies = await prisma.publicMovie.findMany({
    orderBy: [
      {
        publicationDate: { sort: 'desc', nulls: 'last' }
      }
    ]
  })
  const publicMovies = makePublicMovieFromRawPublicMovies(rawPublicMovies)

  return publicMovies
}
