export const dynamic = 'force-dynamic'

import { PublicMovieList } from '@/features/public-movie/PublicMovies'
import { getAllPublicMovies } from '@/data/publicMovies'
import type { PublicMovie } from '@/features/public-movie/publicMovie'

export default async function PublicMovie() {
  const publicMovies = await getAllPublicMovies()

  return <PublicMovieList publicMovies={publicMovies} />
}
