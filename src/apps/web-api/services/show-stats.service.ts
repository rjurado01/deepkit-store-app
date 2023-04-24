import {Service} from 'diod'
import {ListProductsService} from '../../../core/product/app/list-products.service'
import {ProductCriteria} from '../../../core/product/domain/product.criteria'

export interface ShowStatsView {
  productsCount: number
  usersCount: number
}

@Service()
export class ShowStatsService {
  constructor(private readonly listProductsService: ListProductsService) {}

  async run(): Promise<ShowStatsView> {
    const productsCriteria = new ProductCriteria({})
    const productsResult = await this.listProductsService.run(productsCriteria)

    return {
      productsCount: productsResult.meta.totalElements,
      usersCount: 1, // TODO
    }
  }
}
