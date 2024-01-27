import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/authOptions'
import { notFound } from 'next/navigation'
import prisma from '../lib/prisma'
import { Fragment } from 'react'
import Image from 'next/image'

export default async function MyMovie() {
  const session = await getServerSession(authOptions)
  if (!session) {
    notFound()
  }
  const author = await prisma.user.findFirst({
    where: { email: session.user?.email },
    select: { id: true }
  })

  if (author === null) {
    return notFound()
  }
  const movies = await prisma.movie.findMany({
    where: {
      authorId: author.id
    },
    select: {
      title: true,
      siteURL: true,
      image: true
    }
  })
  //TODO: 画像の縮尺を維持する
  return (
    <>
      {session && (
        <>
          <h2 className="flex justify-center items-center">登録済み映画</h2>
          <table>
            <tbody>
              {movies?.map((movie) => {
                return (
                  <Fragment key={movie.title}>
                    <tr>
                      <th>{}</th>
                      <td>
                        <Image
                          src={movie.image ?? ''}
                          alt={movie.title}
                          width={120}
                          height={180}
                          unoptimized={true}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>{}</th>
                      <td>{movie.title}</td>
                    </tr>
                    <tr>
                      <th>サイトURL</th>
                      <td>
                        <a
                          href={movie.siteURL ?? '/'}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {movie.siteURL}{' '}
                        </a>
                      </td>
                    </tr>
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  )
}
