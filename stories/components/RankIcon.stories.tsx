import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { RankIcon } from '../../app/components/RankIcon'

const meta = {
  title: 'Components/RankIcon',
  component: RankIcon,
  args: { order: 1, width: '40px', height: '40px' },
  argTypes: { order: { control: { type: 'number', min: 1 } } }
} satisfies Meta<typeof RankIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Gold: Story = { args: { order: 1 } }
export const Silver: Story = { args: { order: 2 } }
export const Bronze: Story = { args: { order: 3 } }
export const Others: Story = { args: { order: 4 } }

export const AllRanks: Story = {
  render: (args) => (
    <div className="flex gap-4">
      {[1, 2, 3, 4].map((order) => (
        <RankIcon key={order} {...args} order={order} />
      ))}
    </div>
  )
}
