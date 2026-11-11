'use client'

import { signInWithGitHub, signOut, useSession } from '@/lib/auth-client'

export default function Login() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <div>
          <button onClick={() => signOut()}>ログアウト</button>
        </div>
      </>
    )
  } else {
    return (
      <div>
        <button className={'blue-button'} onClick={() => signInWithGitHub()}>
          ログイン
        </button>
      </div>
    )
  }
}
