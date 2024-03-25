import ResponsiveAppBar from '../../components/Header'
import { NextAuthProvider } from '../../providers'

export default function MyMovieLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NextAuthProvider>
        <ResponsiveAppBar title={'見た映画'} />
        {children}
      </NextAuthProvider>
    </>
  )
}
