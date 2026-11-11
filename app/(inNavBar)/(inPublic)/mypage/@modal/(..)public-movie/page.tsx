import { Modal } from '@/components/Modal'
import { PublicMovieList } from '@/features/public-movie/PublicMovies'
import { getAllPublicMovies } from '@/data/publicMovies'
import type { PublicMovie } from '@/features/public-movie/publicMovie'

export default async function PublicMovie() {
  const publicMovies = await getAllPublicMovies()

  return (
    <>
      <Modal>
        <PublicMovieList publicMovies={publicMovies} />
      </Modal>
    </>
  )
}
