'use client'

import { useSession } from 'next-auth/react'
import LoginButton from '../components/LoginButton'
import { NextAuthProvider } from '../providers'
import Image from 'next/image'
import ResponsiveAppBar from '../components/Header'
import { MovieRegistrationForm } from '../features/movieRegistration/MovieRegistrationForm'

export default function Mypage() {
  return (
    <NextAuthProvider>
      <ClientMypage />
    </NextAuthProvider>
  )
}

function Loading() {
  return (
    <h2 className="px-3 py-1 mt-1 text-base font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
      ログイン状態を確認中...
    </h2>
  )
}

function ClientMypage() {
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <>
      <ResponsiveAppBar />
      {status === 'loading' ? (
        <Loading />
      ) : status === 'authenticated' ? (
        <>
          <h2>Welcome {user?.name}</h2>
          <Image
            src={user?.image ?? ''}
            alt={user?.name ?? 'user img'}
            width={90}
            height={90}
          />
          {user?.email && <MovieRegistrationForm userEmail={user?.email} />}
        </>
      ) : (
        <>
          <div>{`映画情報の管理にはログインが必要です。`}</div>
          <LoginButton />
        </>
      )}
    </>
  )
}
