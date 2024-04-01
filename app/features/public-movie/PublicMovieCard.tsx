import styles from '@/app/features/public-movie/publicMovieCard.module.scss'
import { PublicMovie } from '@/app/features/public-movie/getAllPublicMovies'

export function PublicMovieCard(publicMovie: PublicMovie) {
  return (
    <div className={styles.card}>
      {publicMovie.title} 公開日: {publicMovie.publicationDate}
    </div>
  )
}
