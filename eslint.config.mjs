import nextPlugin from 'eslint-config-next'

const eslintConfig = [
  {
    ignores: ['storybook-static/**']
  },
  ...nextPlugin,
  {
    // Database access must go through the Data Access Layer (app/data),
    // which performs authentication and authorization checks.
    files: ['app/**/*.{ts,tsx}'],
    ignores: ['app/data/**', 'app/lib/auth.ts', 'app/lib/prisma.ts'],
    rules: {
      '@typescript-eslint/no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@prisma/client',
              message: 'Use the Data Access Layer in app/data instead.',
              allowTypeImports: true
            }
          ],
          patterns: [
            {
              group: ['**/lib/prisma'],
              message: 'Use the Data Access Layer in app/data instead.'
            }
          ]
        }
      ]
    }
  }
]

export default eslintConfig
