import {injectable} from '../../../shared/decorators/injectable'
import {ShowProductCategoryService} from '../../product-category/app/show-product-category.service'
import {ProductCategoryNotFoundError} from '../../product-category/domain/product-category-not-found.error'
import {ProductCategoryFilter} from '../../product-category/domain/product-category.criteria'
import {ProductCategoryInvalidError} from '../domain/product-category-invalid.error'
import {ProductExternalServicesIntegration} from '../domain/product-external-modules.integration'

@injectable()
export class ProductExternalServicesImportIntegration
  implements ProductExternalServicesIntegration
{
  constructor(private readonly showProductCategoryService: ShowProductCategoryService) {}

  async checkProductCategory(categoryId: string) {
    try {
      await this.showProductCategoryService.run(new ProductCategoryFilter({id: categoryId}))
    } catch (err) {
      if (err instanceof ProductCategoryNotFoundError) {
        throw new ProductCategoryInvalidError(categoryId)
      }

      throw err
    }
  }
}
