import { FlatCompat } from '@eslint/eslintrc'
import { defineConfig, globalIgnores } from 'eslint/config'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})

const eslintConfig = defineConfig([
  globalIgnores([
    '.tmp/**',
    '**/.git/**',
    '**/.hg/**',
    '**/.pnp.*',
    '**/.svn/**',
    '**/.yarn/**',
    '**/build/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/temp/**',
    '**/.next/**',
    'playwright.config.ts',
    'jest.config.js',
    'src/payload-types.ts',
  ]),
  ...compat.config({
    extends: ['next', 'prettier'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }),
])

export default eslintConfig
