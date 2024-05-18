export const dynamic = 'force-dynamic'

import { PublicMovieList } from '@/features/public-movie/PublicMovies'
import { getAllPublicMovies } from '@/features/public-movie/getAllPublicMovies'
import type { PublicMovie } from '@/features/public-movie/getAllPublicMovies'

export default async function PublicMovie() {
  const publicMovies = await getAllPublicMovies()

  return (
    <>
      <PublicMovieList publicMovies={publicMovies} />
    </>
  )
}
