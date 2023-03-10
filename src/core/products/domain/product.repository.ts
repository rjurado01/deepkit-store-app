import {Product} from './product.entity'
import {ProductCriteria} from './product.criteria'

export abstract class ProductRepository {
  abstract findAll(query?: ProductCriteria): Promise<Product[]>
  abstract count(query?: ProductCriteria): Promise<number>
  abstract create(product: Product): Promise<void>
  abstract clear(): Promise<void>
}
