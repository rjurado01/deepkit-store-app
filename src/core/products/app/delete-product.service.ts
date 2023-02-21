import {Service} from 'diod'

import {isUuid, ValidatedClass} from '../../../lib/class-attrs'
import {ProductFilter} from '../domain/product.criteria'
import {ProductRepository} from '../domain/product.repository'

export class DeleteProductDto extends ValidatedClass<DeleteProductDto> {
  @isUuid()
  readonly id: string
}

@Service()
export class DeleteProductService {
  constructor(private readonly repository: ProductRepository) {}

  async run(data: DeleteProductDto): Promise<void> {
    const filter = new ProductFilter({id: data.id})
    const product = await this.repository.findOne(filter)

    await this.repository.delete(product)
  }
}
