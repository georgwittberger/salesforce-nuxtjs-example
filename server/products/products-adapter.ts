import jsforce, { QueryResult } from 'jsforce'
import Product from './product'

export interface ProductsAdapterConfig {
  username: string
  password: string
}

export async function getProducts(config: ProductsAdapterConfig): Promise<Product[]> {
  if (!config.username) {
    throw new Error('Username missing in products adapter configuration')
  }
  if (!config.password) {
    throw new Error('Password missing in products adapter configuration')
  }

  const connection = new jsforce.Connection({})
  await connection.login(config.username, config.password)

  const productsResult = await new Promise<QueryResult<Product2>>((resolve, reject) => {
    connection.query<Product2>(
      'SELECT ProductCode, Name, Description FROM Product2 WHERE IsActive = true',
      {
        autoFetch: true,
        maxFetch: 10000
      },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )
  })

  const products = productsResult.records.map<Product>(product => ({
    id: product.ProductCode,
    name: product.Name,
    description: product.Description
  }))

  await connection.logout()

  return products
}

interface Product2 {
  ProductCode: string
  Name: string
  Description: string
}
