import {Service} from 'diod'
import {ProductCriteria} from '../domain/product.criteria'
import {ProductRepository} from '../domain/product.repository'

@Service()
export class ListProductsService {
  constructor(private readonly repository: ProductRepository) {}

  async run(query: ProductCriteria) {
    const data = await this.repository.findAll(query)
    const count = await this.repository.count(query)

    return {data, meta: {totalElements: count}}
  }
}
