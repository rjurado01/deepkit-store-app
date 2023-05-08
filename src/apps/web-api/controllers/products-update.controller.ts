import {Request, Response} from 'express'

import {
  UpdateProductDto,
  UpdateProductService,
} from '../../../core/product/app/update-product.service'

import {injectable} from '../../../shared/decorators/injectable'
import {authenticated} from '../guards/authenticated.guard'

@injectable()
export class ProductsUpdateController {
  constructor(private service: UpdateProductService) {}

  @authenticated()
  async run(req: Request, res: Response) {
    const dto = new UpdateProductDto({...req.body, id: req.params.id})

    await this.service.run(dto)

    res.status(204).send()
  }
}
