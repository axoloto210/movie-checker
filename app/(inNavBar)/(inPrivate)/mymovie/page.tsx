import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { MovieDnDList } from 'app/features/mymovie/MovieDnDList'
import prisma from 'app/lib/prisma'

export default async function MyMovie() {
  const session = await getSession()
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
      watched: true
    },
    select: {
      id: true,
      title: true,
      siteURL: true,
      image: true,
      order: true,
      watched: true,
      watchedDate: true
    },
    orderBy: {
      order: 'asc'
    }
  })

  return <>{session && <MovieDnDList movies={movies} />}</>
}
