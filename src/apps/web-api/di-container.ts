import {ContainerBuilder} from 'diod'
import {CreateProductService} from '../../core/product/app/create-product.service'
import {DeleteProductService} from '../../core/product/app/delete-product.service'

import {ListProductsService} from '../../core/product/app/list-products.service'
import {ShowProductService} from '../../core/product/app/show-product.service'
import {UpdateProductService} from '../../core/product/app/update-product.service'
import {ProductRepository} from '../../core/product/domain/product.repository'
import {ProductInMemeoryRepository} from '../../core/product/infra/product-in-memery.repository'
import {ShowUserService} from '../../core/user/app/show-user.service'
import {UserRepository} from '../../core/user/domain/user.repository'
import {UserInMemeoryRepository} from '../../core/user/infra/user-in-memery.repository'
import {ProductsCreateController} from './controllers/products-create.controller'
import {ProductsDeleteController} from './controllers/products-delete.controller'
import {ProductsListController} from './controllers/products-list.controller'
import {ProductsShowController} from './controllers/products-show.controller'
import {ProductsUpdateController} from './controllers/products-update.controller'
import {SessionsCreateController} from './controllers/sessions-create.controller'
import {CreateSessionService} from './services/create-session.service'

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

function registerUserModule(builder: ContainerBuilder) {
  builder.register(UserRepository).use(UserInMemeoryRepository).asSingleton()

  builder.registerAndUse(ShowUserService)
}

function registerAuthModule(builder: ContainerBuilder) {
  builder.registerAndUse(CreateSessionService)

  builder.registerAndUse(SessionsCreateController)
}

const builder = new ContainerBuilder()

registerProductModule(builder)
registerUserModule(builder)
registerAuthModule(builder)

const container = builder.build()

export {container}
