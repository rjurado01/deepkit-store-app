import {IRouter} from 'express'
import {ProductsCreateController} from '../controllers/products-create.controller'
import {ProductsDeleteController} from '../controllers/products-delete.controller'
import {ProductsListController} from '../controllers/products-list.controller'
import {ProductsShowController} from '../controllers/products-show.controller'
import {ProductsUpdateController} from '../controllers/products-update.controller'
import {container} from '../di-container'
import {upload} from '../services/upload'

const productsRouter = {
  register: (router: IRouter) => {
    const listController = container.get(ProductsListController)
    const showController = container.get(ProductsShowController)
    const createController = container.get(ProductsCreateController)
    const updateController = container.get(ProductsUpdateController)
    const deleteController = container.get(ProductsDeleteController)

    router.get('/products', listController.run.bind(listController))
    router.post('/products', upload.single('photo'), createController.run.bind(createController))
    router.get('/products/:id', showController.run.bind(showController))
    router.put('/products/:id', updateController.run.bind(updateController))
    router.delete('/products/:id', deleteController.run.bind(deleteController))
  },
}

export {productsRouter}
