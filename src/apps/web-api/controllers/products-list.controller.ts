import { http } from '@deepkit/http';
import { ListProductsService } from '../../../core/products/app/list-products.service';

export class ListProductsController {
  constructor(private service: ListProductsService) {}

  @http.GET('/products')
  async run() {
    const result = await this.service.run({})

    return result;
  }
}
