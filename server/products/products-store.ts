import Product from './product'

const products: Product[] = []

export default {
  loadProducts(): void {
    products.push(
      { id: '1', name: 'Banana' },
      { id: '2', name: 'Peach' },
      { id: '3', name: 'Strawberry' },
      { id: '4', name: 'Ananas' }
    )
  },
  getAllProducts(): Product[] {
    return products
  },
  getProductById(id: string): Product | undefined {
    return products.find(product => product.id === id)
  }
}
