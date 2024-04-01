import prisma from 'app/lib/prisma'

const getFormattedDate = (date: Date) => date.toLocaleDateString()

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
  const publicMovies = rawPublicMovies.map((rawPublicMovie) => {
    return {
      ...rawPublicMovie,
      siteURL: rawPublicMovie.siteURL ?? '',
      publicationDate: rawPublicMovie.publicationDate
        ? getFormattedDate(rawPublicMovie.publicationDate)
        : 'NO_DATA'
    }
  })

  return publicMovies
}
