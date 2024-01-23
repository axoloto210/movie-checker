'use client'

import { useSession } from 'next-auth/react'
import { NextAuthProvider } from '../../providers'
import ResponsiveAppBar from '../../components/Header'
import { Fragment, useEffect, useState } from 'react'
import { RegisteredMovie } from '@/app/components/feature/movieRegistration/MovieRegistrationForm'

export default function MyMoviepage() {
  return (
    <NextAuthProvider>
      <ClientMyMovie />
    </NextAuthProvider>
  )
}

function ClientMyMovie() {
  const { data: session } = useSession()
  const user = session?.user

  const [movies, setMovies] = useState<RegisteredMovie[]>([])

  //getServerSidePropsの方が簡潔。
  useEffect(() => {
    if (user?.email !== undefined) {
      const fetchMovies = async () => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/getUserMovies'

        const params = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userEmail: user?.email
          })
        }

        await fetch(url, params)
          .then((res) => res.json())
          .then((res) => {
            const { userMovies } = res
            setMovies(userMovies)
          })
          .catch(() =>
            alert('エラーが発生しました。時間をあけて再度お試しください。')
          )
      }
      fetchMovies()
    }
  }, [user?.email])

  return (
    <>
      <ResponsiveAppBar />
      {session && (
        <>
          <h2 className="flex justify-center items-center">登録済み映画</h2>
          <table>
            <tbody>
              {movies?.map((movie) => {
                return (
                  <Fragment key={movie.title}>
                    <tr>
                      <th>タイトル</th>
                      <td>{movie.title}</td>
                    </tr>
                    <tr>
                      <th>サイトURL</th>
                      <td>
                        <a href={movie.siteURL}>{movie.siteURL}</a>
                      </td>
                    </tr>
                    <tr>
                      <th>画像</th>
                      <td>
                        <img src={movie.image} alt={movie.title} width={120} />
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
