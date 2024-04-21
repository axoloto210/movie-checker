import ResponsiveAppBar from 'app/components/Header'

export default function MyPageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ResponsiveAppBar title={'マイページ'} />
      {children}
    </>
  )
}
