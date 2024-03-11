import { Meta, StoryObj } from '@storybook/react'
import { LoginLoading } from '../app/components/LoginLoading'

const meta = {
  title: 'LoginLoading',
  component: LoginLoading
} as Meta<typeof LoginLoading>

export default meta

export const LoginStory: StoryObj = {
  args: {}
}
