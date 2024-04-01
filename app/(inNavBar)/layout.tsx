import { NextAuthProvider } from 'app/providers'

export default function PublicMovieLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NextAuthProvider>{children}</NextAuthProvider>
    </>
  )
}
