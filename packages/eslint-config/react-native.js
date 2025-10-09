import base from './base.js'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'

export default [
  ...base,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-native': reactNative,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-unused-styles': 'warn',
    },
  },
]
