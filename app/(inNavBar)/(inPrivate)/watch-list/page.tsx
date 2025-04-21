import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from 'app/api/auth/authOptions'
import { MovieDnDList } from 'app/features/mymovie/MovieDnDList'
import prisma from 'app/lib/prisma'

export default async function WatchList() {
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
      watched: true
    },
    orderBy: {
      order: 'asc'
    }
  })

  return <>{session && <MovieDnDList movies={movies} />}</>
}
