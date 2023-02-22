import { UUID, validate } from '@deepkit/type';

export class Product {
  readonly id: UUID 
  readonly name: string
  readonly price: number
  readonly description?: string

  constructor(data: Partial<Product>) {
    const errors = validate<Product>(data)

    if (errors.length) throw new Error(`Invalid Product: ${errors}`)

    Object.assign(this, data)
  }
}
