import {
  isEnum,
  isFloat,
  isInstance,
  isString,
  isUuid,
  ValidatedClass,
} from '../../../lib/class-attrs'
import {CriteriaOrder, CriteriaPage} from '../../shared/domain/criteria'

export class ProductFilter extends ValidatedClass<ProductFilter> {
  @isUuid({optional: true})
  readonly id?: string

  @isFloat({optional: true, cast: true})
  readonly priceLT: number

  @isString({optional: true})
  readonly search?: string
}

export class ProductOrder extends ValidatedClass<ProductFilter> {
  @isString()
  readonly field: string

  @isEnum({enum: CriteriaOrder, cast: true})
  readonly dir: CriteriaOrder
}

export class ProductCriteria extends ValidatedClass<ProductCriteria> {
  @isInstance({of: ProductFilter, optional: true, cast: true})
  readonly filter?: ProductFilter

  @isInstance({of: CriteriaPage, optional: true, cast: true})
  readonly page?: CriteriaPage

  @isInstance({of: ProductOrder, optional: true, cast: true})
  readonly order?: ProductOrder
}
