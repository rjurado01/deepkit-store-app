import 'reflect-metadata'

import {ContainerBuilder} from 'diod'
import express from 'express'
import {ListProductsService} from '../../core/products/app/list-products.service'
import {ProductRepository} from '../../core/products/domain/product.repository'
import {ProductInMemeoryRepository} from '../../core/products/infra/product-in-memery.repository'
import {ProductsListController} from './controllers/products-list.controller'
import {ProductCriteria} from '../../core/products/domain/product.criteria'

import {z} from 'zod'

const User = z.object({
  username: z.coerce.string(),
  age: z.coerce.number(),
})

const u = User.parse({username: 2, age: '12'})
console.log(u)

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

app.get('/products', async (req, res) => {
  const controller = container.get(ProductsListController)
  const result = await controller.run(new ProductCriteria(req.query))

  res.send(result)
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`)
})
