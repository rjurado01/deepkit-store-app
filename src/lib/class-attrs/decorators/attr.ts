import {AttrType, METADATA_KEY} from '../constants'

export function attr(type: AttrType, options = {}) {
  return function (target: any, propertyKey: string | symbol): void {
    const attrs = Reflect.getMetadata(METADATA_KEY, target) || {}

    attrs[propertyKey] = {...options, type}

    Reflect.defineMetadata(METADATA_KEY, attrs, target)
  }
}
