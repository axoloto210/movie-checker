import { authOptions } from '@/api/auth/authOptions'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'

export async function DELETE(
  _req: NextRequest,
  props: { params: Promise<{ movieId: string }> }
) {
  const params = await props.params
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ status: 500 })
  }

  const movieId = params.movieId

  const user = session.user
  if (user === null) {
    return Response.json({ status: 500 })
  }

  const userEmail = user?.email

  if (!hasUserEmail(userEmail)) {
    return Response.json({ status: 500 })
  }

  try {
    const userId = await getUserId(userEmail)
    if (userId === null || userId === undefined) {
      throw new Error('User Not Exists')
    }
    await deleteMovie(Number(movieId), userId)
    return Response.json({ status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json({ status: 500 })
  }
}

function hasUserEmail(
  userEmail: string | undefined | null
): userEmail is string {
  return userEmail != null
}

async function getUserId(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail
    },
    select: {
      id: true
    }
  })
  return user?.id
}

async function deleteMovie(movieId: number, userId: string) {
  await prisma.movie.delete({
    where: {
      id: movieId,
      authorId: userId
    }
  })
}
