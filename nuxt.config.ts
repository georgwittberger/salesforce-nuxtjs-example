import cookieSession from 'cookie-session'
import { OAuth2Config, OAuth2Module } from './modules/oauth2'
import { ProductsApiConfig, ProductsApiModule } from './modules/products-api'
import { ProductsPrefetchingConfig, ProductsPrefetchingModule } from './modules/products-prefetch'
import { UsersApiConfig, UsersApiModule } from './modules/users-api'

const apiPrefix = process.env.API_PREFIX || '/api'

module.exports = {
  mode: 'universal',
  /*
   * Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   * Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   * Global CSS
   */
  css: [],
  /*
   * Client-side environment variables
   */
  env: {},
  /*
   * Plugins to load before mounting the App
   */
  plugins: [],
  /*
   * Nuxt.js build modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   * Nuxt.js runtime modules
   */
  modules: [
    '@nuxtjs/axios',
    [
      OAuth2Module,
      {
        authorizationURL: process.env.SALESFORCE_AUTH_URL,
        tokenURL: process.env.SALESFORCE_TOKEN_URL,
        userInfoURL: process.env.SALESFORCE_USER_INFO_URL,
        clientID: process.env.SALESFORCE_CLIENT_ID,
        clientSecret: process.env.SALESFORCE_CLIENT_SECRET
      } as OAuth2Config
    ],
    [
      ProductsPrefetchingModule,
      {
        username: process.env.SALESFORCE_USERNAME,
        password: process.env.SALESFORCE_PASSWORD
      } as ProductsPrefetchingConfig
    ],
    [ProductsApiModule, { prefix: apiPrefix } as ProductsApiConfig],
    [UsersApiModule, { prefix: apiPrefix } as UsersApiConfig]
  ],
  axios: {
    prefix: apiPrefix
  },
  /*
   * Build configuration
   */
  build: {},
  /*
   * Server middleware
   */
  serverMiddleware: [
    cookieSession({
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      keys: [process.env.COOKIE_KEY || 'topsecret']
    })
  ]
}
