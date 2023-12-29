import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h2 className="text-lg">Welcome to Movie Checker</h2>
      <Link className={'blue-button'} href={'/mypage'}>
        My Page
      </Link>
    </>
  )
}
