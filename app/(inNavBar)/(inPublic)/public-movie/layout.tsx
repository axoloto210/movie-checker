import ResponsiveAppBar from '@/components/Header'

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
