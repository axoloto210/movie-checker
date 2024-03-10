'use client'

import { useSession } from 'next-auth/react'
import LoginButton from '../components/LoginButton'
import { NextAuthProvider } from '../providers'
import Image from 'next/image'
import ResponsiveAppBar from '../components/Header'
import { MovieRegistrationForm } from '../features/movieRegistration/MovieRegistrationForm'
import { LoginLoading } from '../components/LoginLoading'

export default function Mypage() {
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <>
      {status === 'loading' ? (
        <LoginLoading />
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
