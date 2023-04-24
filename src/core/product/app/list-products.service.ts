import {Service} from 'diod'
import {omit} from '../../../lib/utils'
import {ProductCriteria} from '../domain/product.criteria'
import {Product} from '../domain/product.entity'
import {ProductRepository} from '../domain/product.repository'

export interface ListProductsView {
  data: Omit<Properties<Product>, 'description'>[]
  meta: {
    totalElements: number
  }
}

@Service()
export class ListProductsService {
  constructor(private readonly repository: ProductRepository) {}

  async run(query: ProductCriteria): Promise<ListProductsView> {
    const data = await this.repository.findAll(query)
    const count = await this.repository.count(query.filter)

    return {
      data: data.map(this.mapProductToView),
      meta: {totalElements: count},
    }
  }

  private mapProductToView(product: Product) {
    return omit(product, ['description'])
  }
}
