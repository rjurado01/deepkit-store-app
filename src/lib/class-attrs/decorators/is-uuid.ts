import {AttrType} from '../constants'
import {UuidConfig} from '../validators/uuid'
import {attr} from './attr'

export function isUuid(config: UuidConfig = {}) {
  return attr(AttrType.Uuid, config)
}
