import express from 'express'
import { getAllProducts, getProductById } from './products-store'

export const productsApi = express()

productsApi.get('/', (request, response) => {
  response.status(200).json(getAllProducts())
})

productsApi.get('/:id', (request, response) => {
  const product = getProductById(request.params.id)
  if (product) response.status(200).json(product)
  else response.status(404)
})
