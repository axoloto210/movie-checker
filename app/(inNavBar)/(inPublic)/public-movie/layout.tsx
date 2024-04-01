import ResponsiveAppBar from 'app/components/Header'
import { NextAuthProvider } from 'app/providers'

//TODO: ナビゲーションバーを使用するlayoutを統一
export default function PublicMovieLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ResponsiveAppBar title={'映画を探す'} />
      {children}
    </>
  )
}
