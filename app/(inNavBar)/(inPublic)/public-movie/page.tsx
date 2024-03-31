import { getAllPublicMovies } from '@/app/features/public-movie/getAllPublicMovies'

export default async function PublicMovie() {
  const publicMovies = await getAllPublicMovies()

  return (
    <>
      <div>
        <div>public movie page!</div>
        {publicMovies.map((publicMovie) => {
          return (
            <div key={publicMovie.id}>
              {publicMovie.title} 公開日: {publicMovie.publicationDate}
            </div>
          )
        })}
      </div>
    </>
  )
}
