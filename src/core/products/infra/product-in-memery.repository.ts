import {count, createTable, insert, many} from "blinkdb";
import {BlinkDbClient} from "../../shared/infra/blink-db-client";
import {ProductCriteria} from "../domain/product.criteria";
import {Product} from "../domain/product.entity";
import {ProductRepository} from "../domain/product.repository";

interface ProductTable extends Product {
  id: string 
  search: string
}

export class ProductInMemeoryRepository implements ProductRepository {
  private readonly table

  constructor(private readonly dbClient: BlinkDbClient) {
    this.table = createTable<ProductTable>(dbClient.db, 'products')()
  }

  findAll(query?: ProductCriteria | undefined): Promise<Product[]> {
    return many(this.table, {where: query?.filter})
  }

  count(_query?: ProductCriteria | undefined): Promise<number> {
    return count(this.table) 
  }

  async create(product: Product) {
    await insert(this.table, {...product, search: product.name}) 
  }
}
