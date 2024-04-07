'use client'
import styles from '@/app/(inNavBar)/(inPublic)/public-movie/searchInput.module.scss'
import { PublicMovie } from './getAllPublicMovies'
import { PublicMovieCard } from './PublicMovieCard'
import { useState } from 'react'
import searchPublicMovies, {
  SearchPublicMoviesState
} from '@/app/features/public-movie/actions'
import { useFormState, useFormStatus } from 'react-dom'

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
  const initialState: SearchPublicMoviesState = {
    titleInput: '',
    publicMovies: props.publicMovies
  }

  const [state, formAction] = useFormState(searchPublicMovies, initialState)

  return (
    <>
      <div>
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
            placeholder="映画タイトルの一部を入力して検索"
            required
          />
          <SubmitButton />
        </form>
        {state.publicMovies.map((publicMovie) => {
          return <PublicMovieCard key={publicMovie.id} {...publicMovie} />
        })}
      </div>
    </>
  )
}
