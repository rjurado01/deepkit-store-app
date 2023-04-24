import {Service} from 'diod'
import {ProductNotFoundError} from '../domain/product-not-found.error'
import {ProductCriteria, ProductFilter} from '../domain/product.criteria'
import {Product} from '../domain/product.entity'
import {ProductRepository} from '../domain/product.repository'
import {randomUUID} from 'crypto'

@Service()
export class ProductInMemeoryRepository implements ProductRepository {
  private products: Product[] = [...Array(5)].map(
    n =>
      new Product({
        id: randomUUID(),
        name: `Product ${n}`,
        description: `El producto número ${n}`,
        price: parseFloat((Math.random() * 400).toFixed(2)),
        createdDate: new Date(),
      }),
  )

  findAll(query?: ProductCriteria | undefined): Promise<Product[]> {
    let result = this.products

    if (query?.filter) {
      result = this.applyFilter(query.filter, result)
    }

    return Promise.resolve(result)
  }

  findOne(filter: ProductFilter): Promise<Product> {
    const item = this.applyFilter(filter, this.products)[0]

    if (!item) throw new ProductNotFoundError(filter)

    return Promise.resolve(item)
  }

  count(_query?: ProductCriteria | undefined): Promise<number> {
    return Promise.resolve(this.products.length)
  }

  async create(product: Product): Promise<void> {
    this.products.push(product)
  }

  async update(product: Product): Promise<void> {
    this.products.splice(this.findIndex(product), 1, product)

    return Promise.resolve()
  }

  async delete(product: Product): Promise<void> {
    this.products.splice(this.findIndex(product), 1)

    return Promise.resolve()
  }

  async clear() {
    this.products = []
  }

  private applyFilter(filter: ProductFilter, products: Product[]) {
    return products.filter(item => {
      const id = !filter?.id || item.id === filter.id

      const search =
        !filter?.search || item.name.toLowerCase().includes(filter.search.toLowerCase())

      return id && search
    })
  }

  private findIndex(product: Product): number {
    const index = this.products.findIndex(item => item.id === product.id)

    if (index < 0) throw new ProductNotFoundError(new ProductFilter({id: product.id}))

    return index
  }
}
