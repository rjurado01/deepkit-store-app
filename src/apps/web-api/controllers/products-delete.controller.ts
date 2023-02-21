import {Request, Response} from 'express'

import {
  DeleteProductDto,
  DeleteProductService,
} from '../../../core/products/app/delete-product.service'

import {injectable} from '../../../shared/decorators/injectable'

@injectable()
export class ProductsDeleteController {
  constructor(private service: DeleteProductService) {}

  async run(req: Request, res: Response) {
    const dto = new DeleteProductDto({...req.body, id: req.params.id})

    await this.service.run(dto)

    res.status(204).send()
  }
}
