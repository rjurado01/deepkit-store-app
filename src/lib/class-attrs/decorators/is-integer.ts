import {AttrType} from '../constants'
import {IntegerConfig} from '../validators/integer'
import {attr} from './attr'

export function isInteger(config: IntegerConfig = {}) {
  return attr(AttrType.Integer, config)
}
