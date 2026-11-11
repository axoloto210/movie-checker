import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
    '@storybook/addon-vitest'
  ],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {}
  }
}
export default config
