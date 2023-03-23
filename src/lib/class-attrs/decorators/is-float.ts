import {AttrType} from '../constants'
import {FloatConfig} from '../validators/float'
import {attr} from './attr'

export function isFloat(config: FloatConfig = {}) {
  return attr(AttrType.Integer, config)
}
