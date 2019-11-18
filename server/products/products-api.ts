import express from 'express'
import productsStore from './products-store'

const productsApi = express()

productsApi.get('/', (request, response) => {
  response.status(200).json(productsStore.getAllProducts())
})

productsApi.get('/:id', (request, response) => {
  const product = productsStore.getProductById(request.params.id)
  if (product) response.status(200).json(product)
  else response.status(404)
})

export default productsApi
