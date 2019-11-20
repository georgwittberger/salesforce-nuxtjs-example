import { Module } from '@nuxt/types'
import consola from 'consola'
import { productsApi } from '../server/products/products-api'

export interface ProductsApiConfig {
  prefix?: string
}

export const ProductsApiModule: Module<ProductsApiConfig> = function(config) {
  const path = (config && config.prefix ? config.prefix : '') + '/products'
  consola.info('Registering products API middleware...')
  this.addServerMiddleware({ path, handler: productsApi })
  consola.success(`Products API middleware registered at ${path}`)
}
