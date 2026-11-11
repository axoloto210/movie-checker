import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MovieRankingCard } from '../../../app/features/mypage/MovieRankingCard'
import styles from '../../../app/features/mypage/watchedMovieRanking.module.scss'
import { watchList, watchedMovies } from '../../fixtures/movies'

type Movie = Parameters<typeof MovieRankingCard>[0]

/** MovieRankingCard is called as a function, so wrap it for Storybook. */
function RankingCards({ movies }: { movies: Movie[] }) {
  return (
    <div className={styles.container}>
      {movies.map((movie, index) => (
        <div key={movie.id}>{MovieRankingCard(movie, index)}</div>
      ))}
    </div>
  )
}

const meta = {
  title: 'Features/MyPage/MovieRankingCard',
  component: RankingCards,
  args: { movies: watchedMovies.slice(0, 3) }
} satisfies Meta<typeof RankingCards>

export default meta
type Story = StoryObj<typeof meta>

export const WatchedTop3: Story = {}

export const WatchListTop3: Story = {
  args: {
    movies: watchList.map((movie) => ({
      ...movie,
      publicationDate: new Date('2026-12-01')
    }))
  }
}

export const WithoutImage: Story = {
  args: { movies: [watchedMovies[3]] }
}
