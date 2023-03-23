import {METADATA_KEY} from '../constants'
import {validate} from './validate'

export class ValidatedClass<T> {
  constructor(data: PartialProperties<T>) {
    for (const key in this.attrs) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const val = data[key]

      if (val) Object.assign(this, {[key]: val})
    }

    validate(this)
  }

  protected assign(
    data: PartialProperties<T>,
    keys: (keyof T)[] | undefined = undefined,
  ) {
    for (const key in this.attrs) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const val = data[key]

      if (val && (!keys || keys.includes(key as keyof T))) {
        Object.assign(this, {[key]: val})
      }
    }
  }

  protected attrs() {
    return Reflect.getMetadata(METADATA_KEY, this) as Record<string, Attr>
  }
}
