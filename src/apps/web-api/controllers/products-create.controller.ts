import {Request, Response} from 'express'

import {
  CreateProductDto,
  CreateProductService,
} from '../../../core/products/app/create-product.service'

import {injectable} from '../../../shared/decorators/injectable'

@injectable()
export class ProductsCreateController {
  constructor(private service: CreateProductService) {}

  async run(req: Request, res: Response) {
    const dto = new CreateProductDto(req.body)

    await this.service.run(dto)

    res.status(204).send()
  }
}
