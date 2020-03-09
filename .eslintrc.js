module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    semi: ['warn', 'never'],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0
  }
};
