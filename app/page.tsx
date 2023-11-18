import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h2 className="text-lg">Welcome to Movie Checker</h2>
      <Link
        className={
          'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
        }
        href={'/mypage'}
      >
        My Page
      </Link>
    </>
  )
}
