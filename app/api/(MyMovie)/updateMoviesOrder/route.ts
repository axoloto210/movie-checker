import { authOptions } from '@/app/api/auth/authOptions'
import prisma from '@/app/lib/prisma'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  moviesOrder: z.array(
    z.object({
      id: z.number(),
      order: z.number()
    })
  )
})

type MoviesOrder = z.infer<typeof schema>['moviesOrder']

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return Response.json({ status: 500 })
  }

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

    const { moviesOrder } = schema.parse(await req.json())

    await updateMoviesOrder(moviesOrder, userId)
    revalidatePath('/mymovie') //みた映画情報を読み込み直す。
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

async function updateMoviesOrder(moviesOrder: MoviesOrder, userId: string) {
  const dataList = moviesOrder.map((movieOrder) => {
    return {
      where: { id: movieOrder.id, authorId: userId },
      data: { order: movieOrder.order }
    }
  })

  prisma.$transaction(dataList.map((data) => prisma.movie.update(data)))
}
