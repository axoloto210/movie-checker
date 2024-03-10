import { signIn, signOut, useSession } from 'next-auth/react'

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
        <button className={'blue-button'} onClick={() => signIn()}>
          ログイン
        </button>
      </div>
    )
  }
}
