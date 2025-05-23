'use server'

import { authOptions } from '@/api/auth/authOptions'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import {
  PublicMovie,
  makePublicMovieFromRawPublicMovies
} from './getAllPublicMovies'

export type SearchPublicMoviesState = {
  titleInput: string
  publicMovies: PublicMovie[]
  message?: string
}

const inputSchema = z.object({ titleInput: z.string() })

export default async function searchPublicMovies(
  prevState: SearchPublicMoviesState,
  formData: FormData
) {
  const parse = inputSchema.safeParse({
    titleInput: formData.get('titleInput')
  })
  if (!parse.success) {
    return { ...prevState, message: '入力が不正なため検索できません。' }
  }
  const searchInput = parse.data

  try {
    const rawPublicMovies = await prisma.publicMovie.findMany({
      where: {
        title: { contains: searchInput.titleInput }
      },
      orderBy: [
        {
          publicationDate: { sort: 'desc', nulls: 'last' }
        }
      ]
    })

    if (rawPublicMovies.length === 0) {
      return {
        titleInput: prevState.titleInput,
        publicMovies: makePublicMovieFromRawPublicMovies(rawPublicMovies),
        message: '映画がみつかりませんでした。'
      }
    }

    return {
      titleInput: prevState.titleInput,
      publicMovies: makePublicMovieFromRawPublicMovies(rawPublicMovies),
      message: undefined
    }
  } catch (error: unknown) {
    return { ...prevState, message: '検索に失敗しました。' }
  }
}

/**
 * publicMovieの映画情報をMovieへ登録します。
 * @param movieId
 * @returns
 */
export async function registerWatchedMovieAction(movieId: number) {
  const session = await getServerSession(authOptions)

  if (session?.user?.email == null) {
    return
  }
  const authorId = await getUserId(session.user.email)
  if (authorId == null) {
    return
  }

  const publicMovieData = await getPublicMovieByMovieId(movieId)
  if (publicMovieData === null) {
    return
  }

  await prisma.movie.create({
    data: {
      ...publicMovieData,
      authorId,
      watched: true
    }
  })

  revalidatePath('/mymovie') //みた映画情報を読み込み直す。
  redirect('/mymovie')
}

async function getUserId(userEmail: string) {
  const userId = await prisma.user.findUnique({
    where: {
      email: userEmail
    },
    select: {
      id: true
    }
  })
  return userId?.id
}

async function getPublicMovieByMovieId(movieId: number) {
  const publicMovie = await prisma.publicMovie.findUnique({
    where: { id: movieId },
    select: {
      title: true,
      siteURL: true,
      image: true,
      publicationDate: true
    }
  })
  return publicMovie
}

/**
 * publicMovieの映画情報をMovieへwatchListに登録します。
 * @param movieId
 * @returns
 */
export async function registerWatchListAction(movieId: number) {
  const session = await getServerSession(authOptions)

  if (session?.user?.email == null) {
    return
  }
  const authorId = await getUserId(session.user.email)
  if (authorId == null) {
    return
  }

  const publicMovieData = await getPublicMovieByMovieId(movieId)
  if (publicMovieData === null) {
    return
  }

  await prisma.movie.create({
    data: {
      ...publicMovieData,
      authorId,
      watched: false
    }
  })

  revalidatePath('/watch-list') //みたい映画情報を読み込み直す。
  redirect('/watch-list')
}
