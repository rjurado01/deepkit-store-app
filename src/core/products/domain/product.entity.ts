import {
  isFloat,
  isString,
  isUuid,
  ValidatedClass,
} from '../../../lib/class-attrs'

export class Product extends ValidatedClass<Product> {
  @isUuid()
  readonly id: string

  @isString()
  readonly name: string

  @isFloat()
  readonly price: number

  @isString()
  readonly description?: string

  // METHODS

  update(data: Omit<Properties<Product>, 'id'>) {
    this.assign(data, ['name', 'price', 'description'])
  }
}
