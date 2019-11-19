import productsPrefetcher from './modules/products-prefetcher'
import productsApi from './server/products/products-api'

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
  env: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000/api'
  },
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
  modules: [productsPrefetcher],
  /*
   * Build configuration
   */
  build: {},
  /*
   * Server middleware
   */
  serverMiddleware: [{ path: '/api/products', handler: productsApi }]
}
