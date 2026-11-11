import ResponsiveAppBar from '@/components/Header'
import '@/(inNavBar)/(inPublic)/mypage/modal.css'

export default function MyPageLayout({
  children,
  modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      <ResponsiveAppBar title={'マイページ'} />
      {children}
      {modal}
      <div id="modal-root" />
    </>
  )
}
