import {Service} from 'diod'
import {Request, Response} from 'express'
import {ShowProductService} from '../../../core/products/app/show-product.service'
import {ProductFilter} from '../../../core/products/domain/product.criteria'

@Service()
export class ProductsShowController {
  constructor(private service: ShowProductService) {}

  async run(req: Request, res: Response) {
    const filter = new ProductFilter({id: req.params.id})
    const result = await this.service.run(filter)

    res.send(result)
  }
}
