import {randomUUID} from 'crypto'
import {Service} from 'diod'
import {InMemoryRepository} from '../../shared/infra/in-memory.repository'
import {ProductNotFoundError} from '../domain/product-not-found.error'
import {ProductCriteria, ProductFilter} from '../domain/product.criteria'
import {Product} from '../domain/product.entity'
import {ProductRepository} from '../domain/product.repository'

@Service()
export class ProductInMemeoryRepository
  extends InMemoryRepository<Product, ProductCriteria>
  implements ProductRepository
{
  constructor() {
    super()

    this.items = [1, 2, 3, 4, 5].map(
      n =>
        new Product({
          id: randomUUID(),
          name: `Product ${n}`,
          description: `El producto número ${n}`,
          price: parseFloat((Math.random() * 400).toFixed(2)),
          createdDate: new Date(),
        }),
    )
  }

  protected applyFilter(filter: ProductFilter, products: Product[]) {
    return products.filter(item => {
      const id = !filter?.id || item.id === filter.id

      const search =
        !filter?.search || item.name.toLowerCase().includes(filter.search.toLowerCase())

      return id && search
    })
  }

  protected notFound(filter: ProductFilter) {
    throw new ProductNotFoundError(filter)
  }
}
