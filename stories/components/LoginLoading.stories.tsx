import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LoginLoading } from '../../app/components/LoginLoading'

const meta = {
  title: 'Components/LoginLoading',
  component: LoginLoading
} satisfies Meta<typeof LoginLoading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
