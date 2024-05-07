'use client'
import styles from '@/(inNavBar)/(inPublic)/public-movie/searchInput.module.scss'
import searchPublicMovies from '@/features/public-movie/actions'
import { useSession } from 'next-auth/react'
import { useFormState, useFormStatus } from 'react-dom'
import { PublicMovieCard } from './PublicMovieCard'
import { PublicMovie } from './getAllPublicMovies'

type Props = {
  publicMovies: PublicMovie[]
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className={styles.searchButton} disabled={pending}>
      Search
    </button>
  )
}

export function PublicMovieList(props: Props) {
  const initialState = {
    titleInput: '',
    publicMovies: props.publicMovies,
    message: undefined
  }

  const { status } = useSession()

  const [state, formAction] = useFormState(searchPublicMovies, initialState)

  return (
    <>
      <div className="mt-12">
        <form className={styles.form} action={formAction}>
          <div className={styles.searchArea}>
            <svg
              className={styles.searchIcon}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            className={styles.inputArea}
            name="titleInput"
            autoComplete="off"
            placeholder="タイトルを一部入力"
          />
          <SubmitButton />
        </form>
        {state?.message && (
          <div style={{ display: 'flex' }}>
            <div className={styles.notFound}>{state.message}</div>
          </div>
        )}
        {state.publicMovies.map((publicMovie) => {
          return (
            <PublicMovieCard
              key={publicMovie.id}
              isLogin={status === 'authenticated'}
              {...publicMovie}
            />
          )
        })}
      </div>
    </>
  )
}
