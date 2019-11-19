import jsforce, { QueryResult } from 'jsforce'
import Product from './product'

export default async function loadProductsFromSalesforce(): Promise<Product[]> {
  if (!process.env.SF_USERNAME || !process.env.SF_PASSWORD) {
    throw new Error(
      'Salesforce username or password missing! Please set the environment variables SF_USERNAME and SF_PASSWORD properly.'
    )
  }

  const connection = new jsforce.Connection({})
  await connection.login(process.env.SF_USERNAME, process.env.SF_PASSWORD)

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
