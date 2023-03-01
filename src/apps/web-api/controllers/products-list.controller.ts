import { http, HttpQueries } from '@deepkit/http';
import { ListProductsService } from '../../../core/products/app/list-products.service';
import {ProductCriteria} from '../../../core/products/domain/product.criteria';

export class ProductsListController {
  constructor(private service: ListProductsService) {}

  @http.GET('/products')
  async run(query: HttpQueries<ProductCriteria>) {
    const result = await this.service.run(query)

    return result;
  }
}
