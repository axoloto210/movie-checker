import { authOptions } from '@/api/auth/authOptions'
import { LoginCaveat } from '@/components/LoginCaveat'
import { WatchListRanking } from '@/features/mypage/WatchListRanking'
import { WatchedMovieRanking } from '@/features/mypage/WatchedMovieRanking'
import { getServerSession } from 'next-auth'

import Link from 'next/link'

export default async function Mypage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="mt-4">
      {session ? (
        <>
          <div className="flex justify-between">
            <Link href="/mypage/register-movie">
              <button className="blue-button ml-4">映画を登録</button>
            </Link>
            <Link href="/public-movie">
              <button className="blue-button mr-4">映画を探す</button>
            </Link>
          </div>
          <WatchedMovieRanking />
          <WatchListRanking />
        </>
      ) : (
        <LoginCaveat />
      )}
    </div>
  )
}
