import {ContainerBuilder} from 'diod'
import {ListProductCategoriesService} from '../../core/product-category/app/list-product-categories.service'
import {ShowProductCategoryService} from '../../core/product-category/app/show-product-category.service'
import {ProductCategoryRepository} from '../../core/product-category/domain/product-category.repository'
import {ProductCategoryInMemeoryRepository} from '../../core/product-category/infra/product-category-in-memery.repository'
import {CreateProductService} from '../../core/product/app/create-product.service'
import {DeleteProductService} from '../../core/product/app/delete-product.service'
import {ListProductsService} from '../../core/product/app/list-products.service'
import {ShowProductService} from '../../core/product/app/show-product.service'
import {UpdateProductService} from '../../core/product/app/update-product.service'
import {ProductExternalServicesIntegration} from '../../core/product/domain/product-external-modules.integration'
import {ProductRepository} from '../../core/product/domain/product.repository'
import {ProductExternalServicesImportIntegration} from '../../core/product/infra/product-external-services-import.integration'
import {ProductInMemeoryRepository} from '../../core/product/infra/product-in-memery.repository'
import {ShowUserService} from '../../core/user/app/show-user.service'
import {UserRepository} from '../../core/user/domain/user.repository'
import {UserInMemeoryRepository} from '../../core/user/infra/user-in-memery.repository'
import {ProductCategoriesListController} from './controllers/product-categories-list.controller'
import {ProductsCreateController} from './controllers/products-create.controller'
import {ProductsDeleteController} from './controllers/products-delete.controller'
import {ProductsListController} from './controllers/products-list.controller'
import {ProductsShowController} from './controllers/products-show.controller'
import {ProductsUpdateController} from './controllers/products-update.controller'
import {ProfileShowController} from './controllers/profile-show.controller'
import {SessionsCreateController} from './controllers/sessions-create.controller'
import {StatsShowController} from './controllers/stats-show.controller'
import {CreateSessionService} from './services/create-session.service'
import {ShowStatsService} from './services/show-stats.service'

function registerProductModule(builder: ContainerBuilder) {
  builder.register(ProductRepository).use(ProductInMemeoryRepository).asSingleton()
  builder
    .register(ProductExternalServicesIntegration)
    .use(ProductExternalServicesImportIntegration)
    .asSingleton()

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

function registerProductCategoryModule(builder: ContainerBuilder) {
  builder.register(ProductCategoryRepository).use(ProductCategoryInMemeoryRepository).asSingleton()

  builder.registerAndUse(ShowProductCategoryService)
  builder.registerAndUse(ListProductCategoriesService)

  builder.registerAndUse(ProductCategoriesListController)
}

function registerUserModule(builder: ContainerBuilder) {
  builder.register(UserRepository).use(UserInMemeoryRepository).asSingleton()

  builder.registerAndUse(ProfileShowController)

  builder.registerAndUse(ShowUserService)
}

function registerAuthModule(builder: ContainerBuilder) {
  builder.registerAndUse(CreateSessionService)

  builder.registerAndUse(SessionsCreateController)
}

function registerGeneralModule(builder: ContainerBuilder) {
  builder.registerAndUse(ShowStatsService)
  builder.registerAndUse(StatsShowController)
}

const builder = new ContainerBuilder()

registerProductModule(builder)
registerProductCategoryModule(builder)
registerUserModule(builder)
registerAuthModule(builder)
registerGeneralModule(builder)

const container = builder.build()

export {container}
