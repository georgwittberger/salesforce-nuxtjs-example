import Product from './product'
import { getProducts, ProductsAdapterConfig } from './products-adapter'

let products: Product[] = []

export async function loadProducts(config: ProductsAdapterConfig): Promise<void> {
  products = await getProducts(config)
}

export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}
