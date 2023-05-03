import {injectable} from '../../../shared/decorators/injectable'
import {ProductCategoryFilter} from '../domain/product-category.criteria'
import {ProductCategory} from '../domain/product-category.entity'
import {ProductCategoryRepository} from '../domain/product-category.repository'

export interface ShowProductCategoryView extends Properties<ProductCategory> {}

@injectable()
export class ShowProductCategoryService {
  constructor(private readonly repository: ProductCategoryRepository) {}

  async run(filter: ProductCategoryFilter): Promise<ShowProductCategoryView> {
    const product = await this.repository.findOne(filter)

    return product
  }
}
