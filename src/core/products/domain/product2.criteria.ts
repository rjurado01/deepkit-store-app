import {z} from 'zod'

// export const ProductFilter = z.object({
//   id: z.string().uuid().optional(),
//   search: z.string().optional(),
//   price: z.coerce.number().optional(),
// })

// export type ProductFilter = z.infer<typeof ProductFilter>

// export type ProductCriteria = z.infer<typeof ProductCriteria>

export const ProductFilterSchema = z.object({
  id: z.string().uuid().optional(),
  search: z.string().optional(),
  price: z.coerce.number().optional(),
})

export const ProductCriteriaSchema = z.object({
  filter: ProductFilterSchema.optional(),
})

export class ProductFilter implements z.infer<typeof ProductFilterSchema> {
  readonly id?: string
  readonly aux: number
  readonly search?: string

  constructor(data: ProductFilter) {
    Object.assign(this, ProductFilterSchema.parse(data))
  }
}

export class ProductCriteria implements z.infer<typeof ProductCriteriaSchema> {
  readonly filter?: ProductFilter
  readonly aux?: number

  constructor(data: ProductCriteria) {
    Object.assign(this, ProductCriteriaSchema.parse(data))
  }
}
