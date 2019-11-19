import { loadProducts } from '../server/products/products-store'

export default async function productsPrefetcher(): Promise<void> {
  await loadProducts()
}
