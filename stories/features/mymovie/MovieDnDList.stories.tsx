import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MovieDnDList } from '../../../app/features/mymovie/MovieDnDList'
import { watchList, watchedMovies } from '../../fixtures/movies'

const meta = {
  title: 'Features/MyMovie/MovieDnDList',
  component: MovieDnDList,
  parameters: { layout: 'fullscreen' },
  args: { movies: watchedMovies }
} satisfies Meta<typeof MovieDnDList>

export default meta
type Story = StoryObj<typeof meta>

export const Watched: Story = {}

export const WatchList: Story = {
  args: { movies: watchList, isWatchList: true }
}

export const Empty: Story = {
  args: { movies: [] }
}
