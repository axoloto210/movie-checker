import nextPlugin from 'eslint-config-next'

const eslintConfig = [
  {
    ignores: ['storybook-static/**']
  },
  ...nextPlugin
]

export default eslintConfig
