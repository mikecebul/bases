module.exports = {
  extends: 'next',
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
}
