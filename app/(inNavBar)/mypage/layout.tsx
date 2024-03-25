import ResponsiveAppBar from '../../components/Header'
import { NextAuthProvider } from '../../providers'

export default function MyPageLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NextAuthProvider>
        <ResponsiveAppBar title={'マイページ'} />
        {children}
      </NextAuthProvider>
    </>
  )
}
