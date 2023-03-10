import {Service} from 'diod'
import {ProductCriteria} from '../domain/product.criteria'
import {Product} from '../domain/product.entity'
import {ProductRepository} from '../domain/product.repository'

@Service()
export class ProductInMemeoryRepository implements ProductRepository {
  private products: Product[] = []

  findAll(query?: ProductCriteria | undefined): Promise<Product[]> {
    let result = this.products

    if (query?.filter) {
      result = result.filter(item => {
        const id = !query.filter?.id || item.id === query.filter.id
        const search =
          !query.filter?.search || item.name === query.filter.search

        return id && search
      })
    }

    return Promise.resolve(result)
  }

  count(_query?: ProductCriteria | undefined): Promise<number> {
    return Promise.resolve(this.products.length)
  }

  async create(product: Product): Promise<void> {
    this.products.push(product)
  }

  async clear() {
    this.products = []
  }
}
