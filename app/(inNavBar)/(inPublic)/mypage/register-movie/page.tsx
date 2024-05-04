'use client'

import { LoginCaveat } from '@/app/components/LoginCaveat'
import { LoginLoading } from '@/app/components/LoginLoading'
import { MovieRegistrationForm } from '@/app/features/movieRegistration/MovieRegistrationForm'
import { useSession } from 'next-auth/react'

export default function RegisterMovie() {
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <>
      {status === 'loading' ? (
        <LoginLoading />
      ) : status === 'authenticated' ? (
        <>{user?.email && <MovieRegistrationForm userEmail={user?.email} />}</>
      ) : (
        <LoginCaveat />
      )}
    </>
  )
}
