import {Service} from 'diod'
import {ListProductsService} from '../../../core/products/app/list-products.service'
import {ProductCriteria} from '../../../core/products/domain/product.criteria'

@Service()
export class ProductsListController {
  constructor(private service: ListProductsService) {}

  async run(query: ProductCriteria) {
    return this.service.run(query)
  }
}
