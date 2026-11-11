'use server'

import { verifySession } from '@/data/auth'
import { addPublicMovieToMyMovies } from '@/data/movies'
import { searchPublicMoviesByTitle } from '@/data/publicMovies'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import type { PublicMovie } from './publicMovie'

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

  try {
    const publicMovies = await searchPublicMoviesByTitle(parse.data.titleInput)

    return {
      titleInput: prevState.titleInput,
      publicMovies,
      message:
        publicMovies.length === 0 ? '映画がみつかりませんでした。' : undefined
    }
  } catch {
    return { ...prevState, message: '検索に失敗しました。' }
  }
}

const movieIdSchema = z.number().int()

/**
 * publicMovieの映画情報をMovieへ登録します。
 */
export async function registerWatchedMovieAction(movieId: number) {
  await verifySession()
  await addPublicMovieToMyMovies(movieIdSchema.parse(movieId), true)

  revalidatePath('/mymovie') //みた映画情報を読み込み直す。
  redirect('/mymovie')
}

/**
 * publicMovieの映画情報をMovieへwatchListに登録します。
 */
export async function registerWatchListAction(movieId: number) {
  await verifySession()
  await addPublicMovieToMyMovies(movieIdSchema.parse(movieId), false)

  revalidatePath('/watch-list') //みたい映画情報を読み込み直す。
  redirect('/watch-list')
}
