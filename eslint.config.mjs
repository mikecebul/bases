import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypescript,
  prettier,
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
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])

export default eslintConfig
