'use client'

import { MovieRegistrationForm } from '@/app/features/movieRegistration/MovieRegistrationForm'
import { useSession } from 'next-auth/react'

export default function RegisterMovie() {
  const { data: session, status } = useSession()
  const user = session?.user

  return <>{user?.email && <MovieRegistrationForm userEmail={user?.email} />}</>
}
