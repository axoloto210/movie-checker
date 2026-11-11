import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, screen } from 'storybook/test'
import { MyMovieEditor } from '../../../app/features/mymovie/MyMovieEditor'
import { watchList, watchedMovies } from '../../fixtures/movies'

const [watchedMovie] = watchedMovies
const [plannedMovie] = watchList

const meta = {
  title: 'Features/MyMovie/MyMovieEditor',
  component: MyMovieEditor,
  args: {
    open: true,
    handleCloseAction: fn(),
    movieId: watchedMovie.id,
    initialTitle: watchedMovie.title,
    initialSiteURL: watchedMovie.siteURL,
    initialImage: watchedMovie.image,
    initialWatchedDate: watchedMovie.watchedDate
  }
} satisfies Meta<typeof MyMovieEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Watched: Story = {
  play: async () => {
    await expect(await screen.findByLabelText('みた日（任意）')).toHaveValue(
      '2026-10-01'
    )
  }
}

export const WatchList: Story = {
  args: {
    movieId: plannedMovie.id,
    initialTitle: plannedMovie.title,
    initialSiteURL: plannedMovie.siteURL,
    initialImage: plannedMovie.image,
    initialWatchedDate: undefined,
    initialPlannedDate: plannedMovie.plannedDate,
    isWatchedList: true
  },
  play: async () => {
    await expect(await screen.findByLabelText('みたい日（任意）')).toHaveValue(
      '2026-12-18'
    )
  }
}

export const CancelResetsInput: Story = {
  play: async ({ args, userEvent }) => {
    const titleInput = await screen.findByLabelText(/タイトル/)
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'Edited title')
    await userEvent.click(screen.getByRole('button', { name: 'キャンセル' }))
    await expect(args.handleCloseAction).toHaveBeenCalledOnce()
    await expect(titleInput).toHaveValue(watchedMovie.title)
  }
}
