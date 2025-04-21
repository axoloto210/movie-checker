import { RankIcon } from '@/components/RankIcon'
import styles from '@/features/mypage/watchedMovieRanking.module.scss'
import Image from 'next/image'

export const MovieRankingCard = (
  movie: {
    id: number
    image: string | null
    title: string
    siteURL: string | null
    order: number
  },
  index: number
) => {
  return (
    <div>
      <p className={styles.rank}>
        <RankIcon order={index + 1} width="20px" height="20px" />
        <span className="ml-1 mt-1">{index + 1} </span>
      </p>
      <a
        className={styles.link}
        href={movie.siteURL ?? '/mymovie'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className={styles.imgContainer}
          src={movie.image ?? '/favicon.ico'}
          alt="movie image"
          width="100"
          height="100"
          unoptimized
        />
      </a>
      <div className={styles.movieLabel}>
        <p className={styles.movieTitle}>{movie.title}</p>
      </div>
    </div>
  )
}
