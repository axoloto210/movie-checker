import { authOptions } from '@/api/auth/authOptions'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'
import styles from '@/features/mypage/watchedMovieRanking.module.scss'
import Image from 'next/image'

const rankLimit = 3 as const

export async function WatchedMovieRanking() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/mypage')
  }
  const author = await prisma.user.findFirst({
    where: { email: session.user?.email },
    select: { id: true }
  })

  if (author === null) {
    redirect('/mypage')
  }
  const movies = await prisma.movie.findMany({
    where: {
      authorId: author.id
    },
    select: {
      id: true,
      title: true,
      siteURL: true,
      image: true,
      order: true
    },
    orderBy: {
      order: 'asc'
    },
    take: rankLimit
  })
  return (
    <>
      <div className={styles.containerTitle}>{`みた映画 TOP${rankLimit}`}</div>
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

const MovieRankingCard = (
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
      <p>
        <span>{index + 1}</span>
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
