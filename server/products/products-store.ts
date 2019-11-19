import Product from './product'
import loadProductsFromSalesforce from './products-loader'

let products: Product[] = []

export async function loadProducts(): Promise<void> {
  products = await loadProductsFromSalesforce()
}

export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}
