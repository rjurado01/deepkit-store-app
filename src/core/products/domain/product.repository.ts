import {Product} from "./product.entity";
import {ProductCriteria} from "./product.criteria";

export interface ProductRepository {
  findAll(query?: ProductCriteria): Promise<Product[]>
  count(query?: ProductCriteria): Promise<number>
}
