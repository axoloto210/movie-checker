import 'server-only'

import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export type CurrentUser = {
  id: string
}

/**
 * Returns the signed-in user, or null when not signed in.
 * Memoized per render pass with React cache.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSession()
  return session ? { id: session.user.id } : null
})

/**
 * Returns the signed-in user, or throws UnauthorizedError.
 * Use inside Data Access Layer functions.
 */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser()
  if (!user) {
    throw new UnauthorizedError()
  }
  return user
}

/**
 * Returns the signed-in user, or redirects to the given path.
 * Use in Server Components.
 */
export async function verifySession(
  redirectTo = '/mypage'
): Promise<CurrentUser> {
  const user = await getCurrentUser()
  if (!user) {
    redirect(redirectTo)
  }
  return user
}
