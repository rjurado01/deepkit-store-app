export abstract class ProductExternalServicesIntegration {
  abstract checkProductCategory(categoryId: string): Promise<void>
}
