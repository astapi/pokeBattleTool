module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  // parserOptions: {
  //   parser: 'babel-eslint'
  // },
  parserOptions: {
    "parser": "@typescript-eslint/parser",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier',
    "@typescript-eslint"
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off'
  },
  parserOptions: {
    "extraFileExtensions": [".vue"]
  }
}
