import {isDate, isString, isUuid, ValidatedClass} from '../../../lib/class-attrs'

export class ProductCategory extends ValidatedClass<ProductCategory> {
  @isUuid()
  readonly id: string

  @isString()
  readonly name: string

  @isString()
  readonly description?: string

  // @isInteger()
  // readonly productCount: number

  @isDate()
  readonly createdDate: Date = new Date()

  // METHODS

  update(data: Partial<Omit<Properties<ProductCategory>, 'id' | 'createdDate'>>) {
    this.assign(data, ['name', 'description'])
  }
}
