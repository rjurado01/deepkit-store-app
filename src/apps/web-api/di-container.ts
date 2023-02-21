import {ContainerBuilder} from 'diod'
import {CreateProductService} from '../../core/products/app/create-product.service'
import {DeleteProductService} from '../../core/products/app/delete-product.service'

import {ListProductsService} from '../../core/products/app/list-products.service'
import {ShowProductService} from '../../core/products/app/show-product.service'
import {UpdateProductService} from '../../core/products/app/update-product.service'
import {ProductRepository} from '../../core/products/domain/product.repository'
import {ProductInMemeoryRepository} from '../../core/products/infra/product-in-memery.repository'
import {ProductsCreateController} from './controllers/products-create.controller'
import {ProductsDeleteController} from './controllers/products-delete.controller'
import {ProductsListController} from './controllers/products-list.controller'
import {ProductsShowController} from './controllers/products-show.controller'
import {ProductsUpdateController} from './controllers/products-update.controller'

function registerProductModule(builder: ContainerBuilder) {
  builder.register(ProductRepository).use(ProductInMemeoryRepository).asSingleton()

  builder.registerAndUse(ListProductsService)
  builder.registerAndUse(ShowProductService)
  builder.registerAndUse(CreateProductService)
  builder.registerAndUse(UpdateProductService)
  builder.registerAndUse(DeleteProductService)

  builder.registerAndUse(ProductsListController)
  builder.registerAndUse(ProductsShowController)
  builder.registerAndUse(ProductsCreateController)
  builder.registerAndUse(ProductsUpdateController)
  builder.registerAndUse(ProductsDeleteController)
}

const builder = new ContainerBuilder()

registerProductModule(builder)

const container = builder.build()

export {container}
