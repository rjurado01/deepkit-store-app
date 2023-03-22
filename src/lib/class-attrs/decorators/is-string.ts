import {AttrType} from '../constants'
import {attr} from './attr'
import {StringConfig} from '../validators/string'

export function isString(config: StringConfig = {}) {
  return attr(AttrType.String, config)
}
