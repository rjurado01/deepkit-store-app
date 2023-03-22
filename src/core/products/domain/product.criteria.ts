import {
  IsOptional,
  IsString,
  IsUUID,
  validateSync,
  IsNumber,
} from 'class-validator'

export class ProductFilter {
  @IsUUID()
  @IsOptional()
  readonly id?: string

  @IsNumber()
  @IsOptional()
  readonly price: number

  @IsString()
  @IsOptional()
  readonly search?: string

  constructor(data: ProductFilter) {
    this.id = data.id
    this.search = data.search
    this.price = data.price

    const errors = validateSync(this)
    if (errors.length) throw errors
  }
}

export class ProductCriteria {
  @IsOptional()
  readonly filter?: ProductFilter

  @IsNumber()
  @IsOptional()
  readonly aux?: number

  constructor(data: Properties<ProductCriteria>) {
    const finalErrors = []

    this.aux = data.aux

    try {
      this.setClassAttr('filter', data.filter, ProductFilter)
    } catch (err) {
      finalErrors.push(err)
    }

    const errors = validateSync(this)
    if (errors.length) finalErrors.push(errors)

    if (finalErrors.length) {
      console.log(JSON.stringify(finalErrors))
      // throw finalErrors
    }
  }

  private setClassAttr(
    key: string,
    data: ProductFilter | undefined,
    klass: any,
  ) {
    if (data) {
      if (typeof data !== 'object') {
        throw `Invalid ${key}`
      } else {
        Object.assign(this, {[key]: new klass(data)})
      }
    }
  }
}
