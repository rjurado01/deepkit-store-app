import {Service} from 'diod'

import {isFloat, isString, isUuid, ValidatedClass} from '../../../lib/class-attrs'
import {ProductFilter} from '../domain/product.criteria'
import {ProductRepository} from '../domain/product.repository'

export class UpdateProductDto extends ValidatedClass<UpdateProductDto> {
  @isUuid()
  readonly id: string

  @isString()
  readonly name: string

  @isFloat({cast: true})
  readonly price: number

  @isString()
  readonly description?: string
}

@Service()
export class UpdateProductService {
  constructor(private readonly repository: ProductRepository) {}

  async run(data: UpdateProductDto): Promise<void> {
    const {id, ...updateData} = data
    const filter = new ProductFilter({id})
    const product = await this.repository.findOne(filter)

    product.update(updateData)

    await this.repository.update(product)
  }
}
