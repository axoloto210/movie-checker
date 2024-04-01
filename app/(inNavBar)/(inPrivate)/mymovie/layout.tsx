import ResponsiveAppBar from 'app/components/Header'

export default function MyMovieLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ResponsiveAppBar title={'見た映画'} />
      {children}
    </>
  )
}
