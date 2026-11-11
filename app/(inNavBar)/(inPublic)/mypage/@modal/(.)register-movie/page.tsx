'use client'

import { Modal } from '@/components/Modal'
import { MovieRegistrationForm } from '@/features/movieRegistration/MovieRegistrationForm'
import { useSession } from '@/lib/auth-client'

export default function RegisterMovieModal() {
  const { data: session } = useSession()
  return <Modal>{session && <MovieRegistrationForm />}</Modal>
}
