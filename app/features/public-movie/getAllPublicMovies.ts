import prisma from 'app/lib/prisma'

const getFormattedDate = (date: Date) => date.toLocaleDateString()

export async function getAllPublicMovies() {
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
      publicationDate: rawPublicMovie.publicationDate
        ? getFormattedDate(rawPublicMovie.publicationDate)
        : 'NO_DATA'
    }
  })

  return publicMovies
}
