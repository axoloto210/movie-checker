'use server'

import prisma from '@/app/lib/prisma'
import {
  PublicMovie,
  makePublicMovieFromRawPublicMovies
} from './getAllPublicMovies'

export type SearchPublicMoviesState = {
  titleInput: string
  publicMovies: PublicMovie[]
}

export default async function searchPublicMovies(
  prevState: SearchPublicMoviesState,
  formData: FormData
) {
  'use server'
  const titleInput = formData.get('titleInput')

  const rawPublicMovies = await prisma.publicMovie.findMany({
    where: {
      title: { contains: titleInput as string }
    }
  })

  return {
    titleInput: prevState.titleInput,
    publicMovies: makePublicMovieFromRawPublicMovies(rawPublicMovies)
  }
}
