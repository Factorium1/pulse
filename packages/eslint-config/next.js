import base from './base.js'
import nextPlugin from '@next/eslint-plugin-next'

export default [
  ...base,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      // Starte mit dem offiziellen Next-Profil:
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
]
