import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/authOptions'
import { notFound } from 'next/navigation'
import prisma from '../lib/prisma'
import { MovieDnDList } from '../features/mymovie/MovieDnDList'

export default async function MyMovie() {
  const session = await getServerSession(authOptions)
  if (!session) {
    notFound()
  }
  const author = await prisma.user.findFirst({
    where: { email: session.user?.email },
    select: { id: true }
  })

  if (author === null) {
    return notFound()
  }
  const movies = await prisma.movie.findMany({
    where: {
      authorId: author.id
    },
    select: {
      id: true,
      title: true,
      siteURL: true
    }
  })

  return (
    <>
      {session && (
        <>
          <h2 className="flex justify-center items-center">見た映画</h2>
          <MovieDnDList movies={movies} />
        </>
      )}
    </>
  )
}
