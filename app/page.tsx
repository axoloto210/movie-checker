import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 ml-4">
          Movie Checker
        </h1>
        <h2 className="text-center md:text-left text-lg mt-5 md:pl-8 mr-4">
          {`Movie check app.`}
          <br />
          {`Manage movies you've watched and movies you want to watch.`}
          <br />
          <br />
          {`みた映画、みたい映画を管理しよう。`}
        </h2>
      </section>
      <div className="flex justify-center mb-4">
        <Link className="blue-button w-48 text-center" href={'/mypage'}>
          Get start
        </Link>
      </div>
      <Image
        src="/favicon.ico"
        alt="main Image"
        width={700}
        height={475}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto'
        }}
      />
    </>
  )
}
