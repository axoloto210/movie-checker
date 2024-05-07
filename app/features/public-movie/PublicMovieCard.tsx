import styles from '@/features/public-movie/publicMovieCard.module.scss'
import { PublicMovie } from '@/features/public-movie/getAllPublicMovies'
import { registerMovieAction } from '@/features/public-movie/actions'

type Props = {
  isLogin: boolean
} & PublicMovie

export function PublicMovieCard(props: Props) {
  const fromAction = registerMovieAction.bind(null, props.id)
  return (
    <div className={styles.parentCard}>
      <div className={styles.card}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.publicationDate}>
          公開日: {props.publicationDate}
        </div>
        <div>
          <a
            className={styles.link}
            href={props.siteURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            公式サイトへ
          </a>
        </div>
        {props.isLogin && (
          <form className={styles.form} action={fromAction}>
            <button className={styles.watchedButton} type="submit">
              みた！
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
