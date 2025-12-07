import { authOptions } from '@/api/auth/authOptions'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'
import styles from '@/features/mypage/watchedMovieRanking.module.scss'
import { MovieRankingCard } from './MovieRankingCard'
import Link from 'next/link'

const rankLimit = 3 as const

export async function WatchListRanking() {
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
      authorId: author.id,
      watched: false
    },
    select: {
      id: true,
      title: true,
      siteURL: true,
      image: true,
      order: true,
      watched: true,
      publicationDate: true,
      plannedDate: true
    },
    orderBy: {
      order: 'asc'
    },
    take: rankLimit
  })
  return (
    <>
      <div className={styles.containerTitle}>
        <Link className={styles.link} href={'/watch-list'}>
          {`みたい映画 TOP${rankLimit}`}
        </Link>
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
