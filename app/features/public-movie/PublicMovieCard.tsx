import styles from '@/app/features/public-movie/publicMovieCard.module.scss'
import { PublicMovie } from '@/app/features/public-movie/getAllPublicMovies'
import { RegisterMovieButton } from './RegisterMovieButton'
import { registerMovieAction } from './actions'

type Props = {
  isLogin: boolean
} & PublicMovie

export function PublicMovieCard(props: Props) {
  return (
    <div className={styles.card}>
      {props.title} 公開日: {props.publicationDate}
      {props.isLogin && (
        <form action={() => registerMovieAction(props.id)}>
          <RegisterMovieButton movieId={props.id} />
        </form>
      )}
    </div>
  )
}
