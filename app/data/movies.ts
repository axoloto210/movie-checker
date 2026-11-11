import 'server-only'

import { requireUser } from '@/data/auth'
import prisma from '@/lib/prisma'

export class MovieNotFoundError extends Error {
  constructor() {
    super('Movie not found')
    this.name = 'MovieNotFoundError'
  }
}

const toDate = (value?: string | null) => (value ? new Date(value) : null)

const myMovieSelect = {
  id: true,
  title: true,
  siteURL: true,
  image: true,
  order: true,
  watched: true
} as const

/** Returns the signed-in user's watched movies, ordered by ranking. */
export async function getMyWatchedMovies(options?: { take?: number }) {
  const user = await requireUser()
  return prisma.movie.findMany({
    where: { authorId: user.id, watched: true },
    select: { ...myMovieSelect, watchedDate: true },
    orderBy: { order: 'asc' },
    take: options?.take
  })
}

/** Returns the signed-in user's watch list, ordered by ranking. */
export async function getMyWatchList(options?: { take?: number }) {
  const user = await requireUser()
  return prisma.movie.findMany({
    where: { authorId: user.id, watched: false },
    select: { ...myMovieSelect, publicationDate: true, plannedDate: true },
    orderBy: { order: 'asc' },
    take: options?.take
  })
}

export type CreateMovieInput = {
  title: string
  siteURL: string
  image?: string | null
  watched: boolean
  watchedDate?: string | null
  plannedDate?: string | null
}

export async function createMovie(input: CreateMovieInput) {
  const user = await requireUser()
  return prisma.movie.create({
    data: {
      title: input.title,
      siteURL: input.siteURL,
      image: input.image || null,
      watched: input.watched,
      authorId: user.id,
      watchedDate: toDate(input.watchedDate),
      plannedDate: toDate(input.plannedDate)
    },
    select: { id: true, title: true, watched: true }
  })
}

export type UpdateMovieInput = {
  title: string
  siteURL: string
  image?: string | null
  watchedDate?: string | null
  plannedDate?: string | null
}

export async function updateMovie(movieId: number, input: UpdateMovieInput) {
  const user = await requireUser()
  const { count } = await prisma.movie.updateMany({
    where: { id: movieId, authorId: user.id },
    data: {
      title: input.title,
      siteURL: input.siteURL,
      image: input.image || null,
      watchedDate: toDate(input.watchedDate),
      plannedDate: toDate(input.plannedDate)
    }
  })
  if (count === 0) {
    throw new MovieNotFoundError()
  }
}

/** Moves a movie from the watch list to the end of the watched list. */
export async function markMovieAsWatched(
  movieId: number,
  watchedDate?: string | null
) {
  const user = await requireUser()
  const lastWatchedMovie = await prisma.movie.findFirst({
    where: { authorId: user.id, watched: true },
    orderBy: { order: 'desc' },
    select: { order: true }
  })
  const { count } = await prisma.movie.updateMany({
    where: { id: movieId, authorId: user.id },
    data: {
      watched: true,
      order: (lastWatchedMovie?.order ?? 0) + 1,
      watchedDate: toDate(watchedDate)
    }
  })
  if (count === 0) {
    throw new MovieNotFoundError()
  }
}

export async function deleteMovie(movieId: number) {
  const user = await requireUser()
  const { count } = await prisma.movie.deleteMany({
    where: { id: movieId, authorId: user.id }
  })
  if (count === 0) {
    throw new MovieNotFoundError()
  }
}

/** Movies not owned by the signed-in user are ignored. */
export async function updateMoviesOrder(
  moviesOrder: { id: number; order: number }[]
) {
  const user = await requireUser()
  await prisma.$transaction(
    moviesOrder.map(({ id, order }) =>
      prisma.movie.updateMany({
        where: { id, authorId: user.id },
        data: { order }
      })
    )
  )
}

/** Copies a public movie into the signed-in user's movies. */
export async function addPublicMovieToMyMovies(
  publicMovieId: number,
  watched: boolean
) {
  const user = await requireUser()
  const publicMovie = await prisma.publicMovie.findUnique({
    where: { id: publicMovieId },
    select: { title: true, siteURL: true, image: true, publicationDate: true }
  })
  if (publicMovie === null) {
    throw new MovieNotFoundError()
  }
  await prisma.movie.create({
    data: { ...publicMovie, authorId: user.id, watched }
  })
}
