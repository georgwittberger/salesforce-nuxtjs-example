import Product from './product'

let products: Product[] = []

export async function loadProducts(): Promise<void> {
  products = [
    { id: '1', name: 'Banana' },
    { id: '2', name: 'Peach' },
    { id: '3', name: 'Strawberry' },
    { id: '4', name: 'Ananas' }
  ]
}

export function getAllProducts(): Product[] {
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}
