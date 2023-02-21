import {Request, Response} from 'express'

import {
  UpdateProductDto,
  UpdateProductService,
} from '../../../core/products/app/update-product.service'

import {injectable} from '../../../shared/decorators/injectable'

@injectable()
export class ProductsUpdateController {
  constructor(private service: UpdateProductService) {}

  async run(req: Request, res: Response) {
    const dto = new UpdateProductDto({...req.body, id: req.params.id})

    await this.service.run(dto)

    res.status(204).send()
  }
}
