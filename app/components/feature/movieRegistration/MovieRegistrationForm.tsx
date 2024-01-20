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
    // APIのURL
    const url = 'http://localhost:3000/api/registerMovie'
    // リクエストパラメータ
    const params = {
      method: 'POST',
      // JSON形式のデータのヘッダー
      headers: {
        'Content-Type': 'application/json'
      },
      // リクエストボディ
      body: JSON.stringify({
        title: movie.title,
        siteURL: movie.siteURL,
        image: movie.image,
        userEmail: props.userEmail
      })
    }

    // APIへのリクエスト
    await fetch(url, params)
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
