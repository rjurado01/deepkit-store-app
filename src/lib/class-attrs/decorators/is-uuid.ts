import {AttrType} from '../constants'
import {attr} from './attr'

type Options = {
  optional?: boolean
}

export function isUuid(options: Options = {}) {
  return attr(AttrType.Uuid, options)
}
