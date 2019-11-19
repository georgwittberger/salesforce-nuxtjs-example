import consola from 'consola'
import { loadProducts } from '../server/products/products-store'

export default async function productsPrefetcher(): Promise<void> {
  consola.info('Prefetching products...')
  await loadProducts()
  consola.success('Products successfully prefetched')
}
