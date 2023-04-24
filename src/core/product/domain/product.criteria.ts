import {isFloat, isInstance, isString, isUuid, ValidatedClass} from '../../../lib/class-attrs'

export class ProductFilter extends ValidatedClass<ProductFilter> {
  @isUuid({optional: true})
  readonly id?: string

  @isFloat({optional: true, cast: true})
  readonly priceLT: number

  @isString({optional: true})
  readonly search?: string
}

export class ProductCriteria extends ValidatedClass<ProductCriteria> {
  @isInstance({of: ProductFilter, optional: true, cast: true})
  readonly filter?: ProductFilter
}
