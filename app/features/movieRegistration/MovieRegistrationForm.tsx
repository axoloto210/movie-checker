import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export type RegisteredMovie = {
  title: string
  siteURL: string
  image: string
}

type Props = {
  userEmail: string
}

const MovieRegistrationForm = (props: Props) => {
  const router = useRouter()

  const placeholders = {
    title: 'タイトル',
    siteURL: 'サイトURL',
    image: '画像URL'
  }

  const defaultValues: RegisteredMovie = {
    title: '',
    siteURL: '',
    image: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = async (movie: RegisteredMovie) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/registerMovie'

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: movie.title,
        siteURL: movie.siteURL,
        image: movie.image,
        userEmail: props.userEmail
      })
    }

    await fetch(url, params)
      .then((res) => res.json())
      .then((res) => {
        const { title, siteURL, image } = res
        alert(
          '入力データを登録しました。\n' +
            'トップページへ移動します。\n' +
            `タイトル： ${title} \n` +
            `サイトURL： ${siteURL} \n` +
            `画像URL： ${image}`
        )
        router.push('/')
      })
      .catch(() =>
        alert('エラーが発生しました。時間をあけて再度お試しください。')
      )
  }

  const onError = (err: unknown) => console.log(err)

  return (
    <>
      <div>映画情報登録フォーム</div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="max-w-sm mx-auto"
      >
        <label htmlFor="title" className={'form-label'}>
          {placeholders.title}
        </label>
        <input
          id="title"
          type="text"
          className={'form-text-area'}
          {...register('title', {
            required: '映画のタイトルを入力してください。'
          })}
        />
        <div className="text-red-500">{errors.title?.message}</div>

        <label htmlFor="site-url" className={'form-label'}>
          {placeholders.siteURL}
        </label>
        <textarea
          id="site-url"
          rows={1}
          className={'form-text-area'}
          {...register('siteURL', {
            required: '映画のサイトURLを入力してください。'
          })}
        ></textarea>

        <label htmlFor="image" className={'form-label'}>
          {placeholders.image}
        </label>
        <textarea
          id="image"
          rows={1}
          className={'form-text-area'}
          {...register('image', {
            required: '映画の画像URLを入力してください。'
          })}
        ></textarea>

        <div>
          <button type="submit" className="blue-button mt-4">
            登録
          </button>
        </div>
      </form>
    </>
  )
}

export { MovieRegistrationForm }