import {randomUUID} from "crypto";
import {Product} from "../domain/product.entity";
import {ProductCriteria} from "../domain/product.criteria";
import {ProductRepository} from "../domain/product.repository";

export class ProductInMemeoryRepository implements ProductRepository {
  products: Product[] = [
    new Product({id: randomUUID(), name: 'PA', price: 3.7})
  ]

  findAll(_query?: ProductCriteria | undefined): Promise<Product[]> {
    return Promise.resolve(this.products)
  }

  count(_query?: ProductCriteria | undefined): Promise<number> {
    return Promise.resolve(this.products.length)
  }
}
