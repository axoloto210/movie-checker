'use client'

import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react'
import LoginButton from '../components/LoginButton'
import { NextAuthProvider } from '../providers'
import Image from 'next/image'

export default function Mypage() {
  return (
    <NextAuthProvider>
      <ClientMypage />
    </NextAuthProvider>
  )
}

function ClientMypage() {
  const { data: session } = useSession()
  const user = session?.user

  return (
    <>
      <div>mypage</div>
      {session && (
        <>
          <h2>Welcome {user?.name}</h2>
          <Image
            src={user?.image ?? ''}
            alt={user?.name ?? 'user img'}
            width={90}
            height={90}
          />
        </>
      )}
      <LoginButton />
    </>
  )
}
