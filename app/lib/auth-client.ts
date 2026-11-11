import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient()

export const { useSession } = authClient

export const signInWithGitHub = () =>
  authClient.signIn.social({ provider: 'github' })

/**
 * ログアウト後、Server Component で取得しているセッション情報も更新するためにリロードします。
 */
export const signOut = () =>
  authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        window.location.reload()
      }
    }
  })
