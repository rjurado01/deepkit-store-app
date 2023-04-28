import {Response} from 'express'

import {
  CreateProductDto,
  CreateProductService,
} from '../../../core/product/app/create-product.service'

import {injectable} from '../../../shared/decorators/injectable'
// import {authenticated} from '../guards/authenticated.guard'
import {CustomRequest} from '../interfaces'

@injectable()
export class ProductsCreateController {
  constructor(private service: CreateProductService) {}

  // @authenticated()
  async run(req: CustomRequest, res: Response) {
    const dto = new CreateProductDto(req.body)

    await this.service.run(dto)

    res.status(204).send()
  }
}
