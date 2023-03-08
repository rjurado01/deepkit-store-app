import {validateSync} from 'class-validator'
import {pick} from '../../../lib/utils'

export abstract class Entity<T> {
  id: string

  abstract properties(): PropertyNames<T>[]

  protected assign(data: PartialProperties<T>): void {
    Object.assign(this, pick(data, this.properties()))
  }

  protected assignPick(data: PartialProperties<T>, keys: PartialPropertyNames<T>[]) {
    Object.assign(this, pick(data, keys))
  }

  constructor(data: PartialProperties<T>) {
    this.assign(data)

    validateSync(self)
  }
}
