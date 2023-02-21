import {Service} from 'diod'

import {isFloat, isString, isUuid, ValidatedClass} from '../../../lib/class-attrs'
import {Product} from '../domain/product.entity'
import {ProductRepository} from '../domain/product.repository'

export class CreateProductDto extends ValidatedClass<CreateProductDto> {
  @isUuid()
  readonly id: string

  @isString()
  readonly name: string

  @isFloat()
  readonly price: number

  @isString()
  readonly description?: string
}

@Service()
export class CreateProductService {
  constructor(private readonly repository: ProductRepository) {}

  async run(data: CreateProductDto): Promise<void> {
    const product = new Product({...data, createdDate: new Date()})

    await this.repository.create(product)
  }
}
