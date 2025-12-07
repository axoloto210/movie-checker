import { RegisterMovieResult } from '@/api/(MyMovie)/registerMovie/route'
import { postFetch } from '@/lib/fetch'
import { Switch, FormControlLabel, Snackbar, Alert } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export type RegisteredMovie = {
  title: string
  siteURL: string
  image: string | null
  watched?: boolean
  watchedDate?: string
  plannedDate?: string
}

type Props = {
  userEmail: string
}

const MovieRegistrationForm = (props: Props) => {
  const placeholders = {
    title: 'タイトル',
    siteURL: 'サイトURL',
    image: '画像URL（任意）'
  }

  const defaultValues: RegisteredMovie = {
    title: '',
    siteURL: '',
    image: '',
    watched: false,
    watchedDate: '',
    plannedDate: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm({ defaultValues })

  const isWatched = watch('watched')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success'
  )
  const [isRegistered, setIsRegistered] = useState(false)

  const onSubmit = async (movie: RegisteredMovie) => {
    const body = {
      title: movie.title,
      siteURL: movie.siteURL,
      image: movie.image,
      watched: movie.watched,
      userEmail: props.userEmail,
      // watchedがtrueならwatchedDateを、falseならplannedDateを送信
      ...(movie.watched
        ? { watchedDate: movie.watchedDate || null }
        : { plannedDate: movie.plannedDate || null })
    }

    await postFetch<object, RegisterMovieResult>('/registerMovie', body)
      .then(({ title, watched }) => {
        setIsRegistered(true)
        setSnackbarMessage(`「${title}」を登録しました`)
        setSnackbarSeverity('success')
        setSnackbarOpen(true)

        // 1.5秒後にリダイレクト
        setTimeout(() => {
          window.location.href = watched ? '/mymovie' : '/watch-list'
        }, 1500)
      })
      .catch(() => {
        setSnackbarMessage(
          'エラーが発生しました。時間をあけて再度お試しください。'
        )
        setSnackbarSeverity('error')
        setSnackbarOpen(true)
      })
  }

  const onError = (err: unknown) => console.log(err)

  return (
    <>
      <div className="flex center-text justify-center mt-8 text-2xl font-semibold text-gray-900 dark:text-white">
        映画を登録
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="max-w-sm mx-auto"
      >
        <div className="mb-4">
          <FormControlLabel
            control={<Switch id="watched" {...register('watched')} />}
            label="みた！"
          />
        </div>

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
        <div className="text-red-500">{errors.siteURL?.message}</div>
        <label htmlFor="image" className={'form-label'}>
          {placeholders.image}
        </label>
        <textarea
          id="image"
          rows={1}
          className={'form-text-area'}
          {...register('image')}
        ></textarea>

        {isWatched ? (
          <>
            <label htmlFor="watched-date" className={'form-label'}>
              みた日（任意）
            </label>
            <input
              id="watched-date"
              type="date"
              className={'form-text-area'}
              {...register('watchedDate')}
            />
          </>
        ) : (
          <>
            <label htmlFor="planned-date" className={'form-label'}>
              みたい日（任意）
            </label>
            <input
              id="planned-date"
              type="date"
              className={'form-text-area'}
              {...register('plannedDate')}
            />
          </>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="blue-button mt-6"
            disabled={isSubmitting || isRegistered}
          >
            登録
          </button>
        </div>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export { MovieRegistrationForm }
