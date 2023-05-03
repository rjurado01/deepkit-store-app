import {isFloat, isString, isUuid, ValidatedClass} from '../../../lib/class-attrs'
import {ClassValidation} from '../../../lib/class-attrs/validation/attr-error'
import {injectable} from '../../../shared/decorators/injectable'
import {ProductExternalServicesIntegration} from '../domain/product-external-modules.integration'
import {Product} from '../domain/product.entity'
import {ProductRepository} from '../domain/product.repository'

export class CreateProductDto extends ValidatedClass<CreateProductDto> {
  @isUuid()
  readonly id: string

  @isUuid()
  readonly categoryId: string

  @isString()
  readonly name: string

  @isFloat()
  readonly price: number

  @isString()
  readonly description?: string
}

@injectable()
export class CreateProductService {
  constructor(
    private readonly repository: ProductRepository,
    private readonly externalServices: ProductExternalServicesIntegration,
  ) {}

  async run(data: CreateProductDto): Promise<void> {
    const validation = new ClassValidation(CreateProductDto)

    let product: Product | null = null

    try {
      await this.externalServices.checkProductCategory(data.categoryId)
    } catch (err) {
      validation.catchAttrError(err)
    }

    try {
      product = new Product({...data, createdDate: new Date()})
    } catch (err) {
      validation.catchValidationError(err)
    }

    validation.ensureIsValid()

    if (product) await this.repository.create(product)
  }
}
