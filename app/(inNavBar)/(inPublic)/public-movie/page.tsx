import { PublicMovieCard } from '@/app/features/public-movie/PublicMovieCard'
import {
  PublicMovie,
  getAllPublicMovies
} from '@/app/features/public-movie/getAllPublicMovies'

export default async function PublicMovie() {
  const publicMovies = await getAllPublicMovies()

  return (
    <>
      <div>
        <div>準備中です。</div>
        {publicMovies.map((publicMovie) => {
          return <PublicMovieCard key={publicMovie.id} {...publicMovie} />
        })}
      </div>
    </>
  )
}
