import { authOptions } from '@/api/auth/authOptions'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

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
    take: 3
  })
  return (
    <>
      {movies.map((movie) => {
        return (
          <Fragment key={movie.id}>
            <div>{movie.title}</div>
          </Fragment>
        )
      })}
    </>
  )
}
