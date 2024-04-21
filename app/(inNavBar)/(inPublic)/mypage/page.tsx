'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import LoginButton from 'app/components/LoginButton'
import { LoginLoading } from 'app/components/LoginLoading'
import { MovieRegistrationForm } from 'app/features/movieRegistration/MovieRegistrationForm'

export default function Mypage() {
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <div className="mt-8">
      {status === 'loading' ? (
        <LoginLoading />
      ) : status === 'authenticated' ? (
        <>{user?.email && <MovieRegistrationForm userEmail={user?.email} />}</>
      ) : (
        <div className="text-center">
          <h2 className="mb-4 text-lg text-red-500">{`映画情報の管理にはGitHubアカウントによるログインが必要です。`}</h2>
          <LoginButton />
        </div>
      )}
    </div>
  )
}
