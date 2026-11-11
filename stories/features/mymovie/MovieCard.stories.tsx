import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, screen, waitFor } from 'storybook/test'
import MovieCard from '../../../app/features/mymovie/MovieCard'
import { watchList, watchedMovies } from '../../fixtures/movies'

const [watchedMovie] = watchedMovies
const [plannedMovie] = watchList

const meta = {
  title: 'Features/MyMovie/MovieCard',
  component: MovieCard,
  decorators: [
    (Story) => (
      <div className="bg-gray-100 p-4">
        <Story />
      </div>
    )
  ],
  args: {
    movieId: watchedMovie.id,
    title: watchedMovie.title,
    siteURL: watchedMovie.siteURL,
    image: watchedMovie.image,
    watchedDate: watchedMovie.watchedDate
  }
} satisfies Meta<typeof MovieCard>

export default meta
type Story = StoryObj<typeof meta>

export const Watched: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.queryByText('みた！')).not.toBeInTheDocument()
  }
}

export const WatchList: Story = {
  args: {
    movieId: plannedMovie.id,
    title: plannedMovie.title,
    siteURL: plannedMovie.siteURL,
    image: plannedMovie.image,
    watchedDate: undefined,
    plannedDate: plannedMovie.plannedDate,
    isWatchedList: true
  }
}

export const WithoutImage: Story = {
  args: { image: null }
}

export const LongTitle: Story = {
  args: { title: watchList[1].title }
}

export const OpenWatchedDialog: Story = {
  args: { ...WatchList.args },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('みた！'))
    const dialog = await screen.findByRole('dialog')
    await expect(dialog).toHaveTextContent('みた日を入力')
    await userEvent.click(screen.getByRole('button', { name: 'キャンセル' }))
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    )
  }
}

export const OpenEditor: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('編集'))
    await expect(await screen.findByRole('dialog')).toHaveTextContent(
      '映画情報を編集'
    )
    await expect(screen.getByLabelText(/タイトル/)).toHaveValue(
      watchedMovie.title
    )
  }
}
