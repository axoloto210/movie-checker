import { verifySession } from '@/data/auth'
import { getMyWatchList } from '@/data/movies'
import { MovieDnDList } from '@/features/mymovie/MovieDnDList'

export default async function WatchList() {
  await verifySession()
  const movies = await getMyWatchList()

  return <MovieDnDList movies={movies} isWatchList />
}
