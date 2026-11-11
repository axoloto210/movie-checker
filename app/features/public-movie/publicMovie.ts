import type { PublicMovie as RawPublicMovie } from '@prisma/client'

export type PublicMovie = {
  id: number
  title: string
  siteURL: string
  image: string | null
  publicationDate: string
}

const getFormattedDate = (date: Date) => date.toLocaleDateString()

export const toPublicMovies = (
  rawPublicMovies: RawPublicMovie[]
): PublicMovie[] =>
  rawPublicMovies.map((rawPublicMovie) => ({
    ...rawPublicMovie,
    siteURL: rawPublicMovie.siteURL ?? '',
    publicationDate: rawPublicMovie.publicationDate
      ? getFormattedDate(rawPublicMovie.publicationDate)
      : 'NO_DATA'
  }))
