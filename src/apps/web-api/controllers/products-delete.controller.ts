import {Request, Response} from 'express'

import {
  DeleteProductDto,
  DeleteProductService,
} from '../../../core/product/app/delete-product.service'

import {injectable} from '../../../shared/decorators/injectable'
import {authenticated} from '../guards/authenticated.guard'

@injectable()
export class ProductsDeleteController {
  constructor(private service: DeleteProductService) {}

  @authenticated()
  async run(req: Request, res: Response) {
    const dto = new DeleteProductDto({...req.body, id: req.params.id})

    await this.service.run(dto)

    res.status(204).send()
  }
}
