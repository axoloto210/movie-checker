import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'
import { MovieRegistrationForm } from '../../../app/features/movieRegistration/MovieRegistrationForm'

const meta = {
  title: 'Features/MovieRegistration/MovieRegistrationForm',
  component: MovieRegistrationForm
} satisfies Meta<typeof MovieRegistrationForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Submitting an empty form shows validation errors without calling the API. */
export const RequiredFieldErrors: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '登録' }))
    await expect(
      await canvas.findByText('映画のタイトルを入力してください。')
    ).toBeVisible()
    await expect(
      canvas.getByText('映画のサイトURLを入力してください。')
    ).toBeVisible()
  }
}

export const WatchedShowsWatchedDate: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByLabelText('みたい日（任意）')).toBeVisible()
    await userEvent.click(canvas.getByLabelText('みた！'))
    await expect(canvas.getByLabelText('みた日（任意）')).toBeVisible()
  }
}
