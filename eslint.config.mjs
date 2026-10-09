import { defineConfig, globalIgnores } from 'eslint/config'
import nextConfig from 'eslint-config-next'
import prettierConfig from 'eslint-config-prettier/flat'

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
  ...nextConfig,
  prettierConfig,
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    rules: {
      // Next 16 adds React Compiler diagnostics. Keep them visible while
      // retaining the existing lint policy for this non-compiled application.
      'react-hooks/immutability': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/static-components': 'warn',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])

export default eslintConfig
