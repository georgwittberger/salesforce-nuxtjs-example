import { Module } from '@nuxt/types'
import consola from 'consola'
import { loadProducts } from '../server/products/products-store'

export interface ProductsPrefetchingConfig {
  username: string
  password: string
}

export const ProductsPrefetchingModule: Module<ProductsPrefetchingConfig> = async function(config) {
  if (!config) {
    throw new Error('Configuration missing for products prefetching module')
  }

  consola.info('Prefetching products...')
  try {
    await loadProducts(config)
    consola.success('Prefetching products successful')
  } catch (error) {
    consola.error('Prefetching products failed: ', error)
  }
}
