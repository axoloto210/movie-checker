import prisma from 'app/lib/prisma'

export default async function PublicMovie() {
  const publicMovies = await prisma.publicMovie.findMany()
  return (
    <>
      <div>public movie page!</div>
      {publicMovies.map((publicMovie) => {
        return <div key={publicMovie.id}>{publicMovie.title}</div>
      })}
    </>
  )
}
