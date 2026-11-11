import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { getRouter } from '@storybook/nextjs-vite/navigation.mock'
import { expect, screen, waitFor } from 'storybook/test'
import '../../app/(inNavBar)/(inPublic)/mypage/modal.css'
import { Modal } from '../../app/components/Modal'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  beforeEach: () => {
    // In the app, #modal-root is rendered by mypage/layout.tsx before the modal.
    const modalRoot = document.createElement('div')
    modalRoot.id = 'modal-root'
    document.body.appendChild(modalRoot)
    return () => modalRoot.remove()
  },
  args: {
    children: (
      <div className="p-4">
        <h2 className="text-lg font-bold">Modal content</h2>
        <p>Intercepted routes are rendered inside this modal.</p>
      </div>
    )
  }
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CloseNavigatesBack: Story = {
  play: async ({ userEvent }) => {
    const closeButton = await waitFor(() => {
      const button = document.querySelector<HTMLButtonElement>('.close-button')
      if (!button) throw new Error('close button not rendered')
      return button
    })
    await expect(screen.getByText('Modal content')).toBeVisible()
    await userEvent.click(closeButton)
    await expect(getRouter().back).toHaveBeenCalled()
  }
}
