import { verifySession } from '@/data/auth'
import { getMyWatchedMovies } from '@/data/movies'
import { Fragment } from 'react'
import styles from '@/features/mypage/watchedMovieRanking.module.scss'
import { MovieRankingCard } from './MovieRankingCard'
import Link from 'next/link'

const rankLimit = 3 as const

export async function WatchedMovieRanking() {
  await verifySession()
  const movies = await getMyWatchedMovies({ take: rankLimit })

  return (
    <>
      <div className={styles.containerTitle}>
        <Link
          className={styles.link}
          href={'/mymovie'}
        >{`みた映画 TOP${rankLimit}`}</Link>
      </div>
      <div className={styles.container}>
        {movies?.map((movie, index) => {
          return (
            <Fragment key={movie.id}>{MovieRankingCard(movie, index)}</Fragment>
          )
        })}
      </div>
    </>
  )
}
