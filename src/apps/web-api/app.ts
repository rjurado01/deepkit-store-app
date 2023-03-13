import 'reflect-metadata'

import {ContainerBuilder} from 'diod'
import express from 'express'
import {ListProductsService} from '@core/products/app/list-products.service'
import {ProductRepository} from '@core/products/domain/product.repository'
import {ProductInMemeoryRepository} from '@core/products/infra/product-in-memery.repository'
import {ProductsListController} from './controllers/products-list.controller'

const app = express()
const port = 3000

const builder = new ContainerBuilder()
builder.register(ProductRepository).use(ProductInMemeoryRepository)
builder.registerAndUse(ListProductsService)
builder.registerAndUse(ProductsListController)
const container = builder.build()

app.get('/', (_req, res) => {
  res.send('Hello World 2!')
})

app.get('/products', async (_req, res) => {
  const controller = container.get(ProductsListController)
  const result = await controller.run({})

  res.send(result)
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`)
})
