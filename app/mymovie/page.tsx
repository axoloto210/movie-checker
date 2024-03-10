import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/authOptions'
import { MovieDnDList } from '../features/mymovie/MovieDnDList'
import prisma from '../lib/prisma'

export default async function MyMovie() {
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
      image: true
    }
  })

  return <>{session && <MovieDnDList movies={movies} />}</>
}
