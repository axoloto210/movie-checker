import { PublicMovieCard } from '@/app/features/public-movie/PublicMovieCard'
import { getAllPublicMovies } from '@/app/features/public-movie/getAllPublicMovies'
import type { PublicMovie } from '@/app/features/public-movie/getAllPublicMovies'
import styles from '@/app/(inNavBar)/(inPublic)/public-movie/searchInput.module.scss'

export default async function PublicMovie() {
  const publicMovies = await getAllPublicMovies()

  return (
    <>
      <div>
        <div>準備中です。</div>
        <form className={styles.form}>
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
            id="default-search"
            className={styles.inputArea}
            placeholder="Part of title ..."
            required
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
        {publicMovies.map((publicMovie) => {
          return <PublicMovieCard key={publicMovie.id} {...publicMovie} />
        })}
      </div>
    </>
  )
}
