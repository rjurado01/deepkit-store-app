import {isDate, isFloat, isString, isUuid, ValidatedClass} from '../../../lib/class-attrs'

export class Product extends ValidatedClass<Product> {
  @isUuid()
  readonly id: string

  @isString()
  readonly name: string

  @isFloat()
  readonly price: number

  @isString()
  readonly description?: string

  @isDate()
  readonly createdDate: Date = new Date()

  // METHODS

  update(data: Partial<Omit<Properties<Product>, 'id' | 'createdDate'>>) {
    this.assign(data, ['name', 'price', 'description'])
  }
}
