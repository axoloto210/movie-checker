'use client'

import { LoginCaveat } from '@/components/LoginCaveat'
import { LoginLoading } from '@/components/LoginLoading'
import { MovieRegistrationForm } from '@/features/movieRegistration/MovieRegistrationForm'
import { useSession } from '@/lib/auth-client'

export default function RegisterMovie() {
  const { data: session, isPending } = useSession()

  return (
    <>
      {isPending ? (
        <LoginLoading />
      ) : session != null ? (
        <MovieRegistrationForm />
      ) : (
        <LoginCaveat />
      )}
    </>
  )
}
