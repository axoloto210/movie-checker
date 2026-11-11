import { verifySession } from '@/data/auth'
import { getMyWatchedMovies } from '@/data/movies'
import { MovieDnDList } from '@/features/mymovie/MovieDnDList'

export default async function MyMovie() {
  await verifySession()
  const movies = await getMyWatchedMovies()

  return <MovieDnDList movies={movies} />
}
