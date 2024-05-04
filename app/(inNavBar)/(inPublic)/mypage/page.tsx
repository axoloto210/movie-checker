'use client'
import { useSession } from 'next-auth/react'
import LoginButton from 'app/components/LoginButton'
import { LoginLoading } from 'app/components/LoginLoading'
import Link from 'next/link'
import { LoginCaveat } from '@/app/components/LoginCaveat'

export default function Mypage() {
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <div className="mt-4">
      {status === 'loading' ? (
        <LoginLoading />
      ) : status === 'authenticated' ? (
        <>
          {user?.email && (
            <div className="flex justify-between">
              <Link href="/mypage/register-movie">
                <button className="blue-button ml-4">みた映画を登録</button>
              </Link>
              <Link href="/public-movie">
                <button className="blue-button mr-4">みた映画を探す</button>
              </Link>
            </div>
          )}
        </>
      ) : (
        <LoginCaveat />
      )}
    </div>
  )
}
