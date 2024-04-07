import { PublicMovieList } from '@/app/features/public-movie/PublicMovies'
import { getAllPublicMovies } from '@/app/features/public-movie/getAllPublicMovies'
import type { PublicMovie } from '@/app/features/public-movie/getAllPublicMovies'

export default async function PublicMovie() {
  const publicMovies = await getAllPublicMovies()

  return (
    <>
      <PublicMovieList publicMovies={publicMovies} />
    </>
  )
}
