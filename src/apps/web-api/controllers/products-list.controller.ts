import {Service} from 'diod'
import {Request, Response} from 'express'
import {ListProductsService} from '../../../core/product/app/list-products.service'
import {ProductCriteria} from '../../../core/product/domain/product.criteria'

@Service()
export class ProductsListController {
  constructor(private service: ListProductsService) {}

  async run(req: Request, res: Response) {
    const query = new ProductCriteria(req.query)
    const result = await this.service.run(query)

    res.send(result)
  }
}
