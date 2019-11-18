import productsStore from './products/products-store'

export default function startupCallback() {
  productsStore.loadProducts()
}
