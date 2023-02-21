import {Service} from 'diod'
import {ProductFilter} from '../domain/product.criteria'
import {Product} from '../domain/product.entity'
import {ProductRepository} from '../domain/product.repository'

export interface ShowProductView extends Properties<Product> {}

@Service()
export class ShowProductService {
  constructor(private readonly repository: ProductRepository) {}

  async run(filter: ProductFilter): Promise<ShowProductView> {
    const product = await this.repository.findOne(filter)

    return product
  }
}
