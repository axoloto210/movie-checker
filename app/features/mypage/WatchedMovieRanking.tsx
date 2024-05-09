import { authOptions } from '@/api/auth/authOptions'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'
import '../mypage/watchedMovieRanking.css'
import Image from 'next/image'

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
      <section>
        <div className="container">
          {movies.map((movie, index) => {
            return (
              <Fragment key={movie.id}>
                {MovieRankingCard(movie, index)}
              </Fragment>
            )
          })}
        </div>
      </section>
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
      <div>
        <Image
          className="img_container"
          src={movie.image ?? '/favicon.ico'}
          alt="movie image"
          width="100"
          height="100"
          unoptimized
        />
      </div>
      <div className="">
        <p className="">{movie.title}</p>
      </div>
    </div>
  )
}
