require('dotenv').config()
module.exports = {
  mode: 'spa',
  srcDir: 'src/',
  /*
   ** Headers of the page
   */
  head: {
    title: 'ぽけばと | ポケモン対戦補助ツール',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'ぽけばとはポケモンの対戦を補助するツールです'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'ぽけばと | ポケモン対戦補助ツール'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/ogimage.png'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://pokebat.tools'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'ぽけばとはポケモンの対戦を補助するツールです'
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: 'ぽけばとはポケモンの対戦を補助するツールです'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'ぽけばと | ポケモン対戦補助ツール'
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: '/ogimage.png'
      }
    ],
    link: [
      {
        rel: 'preload',
        href: 'https://kit.fontawesome.com/30869cfbe3.js',
        crossorigin: 'anonymous',
        as: 'script'
      },
      {
        rel: 'preload',
        href: 'https://www.gstatic.com/firebasejs/7.12.0/firebase-analytics.js',
        as: 'script'
      }
    ],
    script: [
      {
        src: 'https://kit.fontawesome.com/30869cfbe3.js',
        crossorigin: 'anonymous'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  router: {
    middleware: 'auth'
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/firebase.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {}
  },

  env: {
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    FIREBASE_DATABASEURL: process.env.FIREBASE_DATABASEURL,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APPID: process.env.FIREBASE_APPID,
    FIREBASE_MESUREMENTID: process.env.FIREBASE_MESUREMENTID,
    ENV: process.env.ENV
  }
}
