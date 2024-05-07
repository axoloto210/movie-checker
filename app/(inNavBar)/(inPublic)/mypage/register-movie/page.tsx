'use client'

import { LoginCaveat } from '@/components/LoginCaveat'
import { LoginLoading } from '@/components/LoginLoading'
import { MovieRegistrationForm } from '@/features/movieRegistration/MovieRegistrationForm'
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
