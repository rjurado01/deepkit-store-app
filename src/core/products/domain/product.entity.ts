import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import {Entity} from '../../shared/domain/entity'

export class Product extends Entity<Product> {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string

  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsNumber()
  @IsNotEmpty()
  readonly price: number

  @IsString()
  @IsOptional()
  readonly description?: string

  // METHODS

  properties(): PropertyNames<Product>[] {
    return ['id', 'name', 'price', 'description']
  }

  update(data: Omit<Properties<Product>, 'id'>) {
    this.assignPick(data, ['name', 'price', 'description'])
  }
}
