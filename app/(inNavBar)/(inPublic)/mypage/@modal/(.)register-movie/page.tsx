'use client'

import { Modal } from '@/app/components/Modal'
import { MovieRegistrationForm } from '@/app/features/movieRegistration/MovieRegistrationForm'
import { useSession } from 'next-auth/react'

export default function RegisterMovieModal() {
  const { data: session } = useSession()
  const user = session?.user
  return (
    <Modal>
      {user?.email && <MovieRegistrationForm userEmail={user?.email} />}
    </Modal>
  )
}
