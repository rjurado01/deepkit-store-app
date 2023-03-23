import {AttrError, AttrErrorCode} from '../validation/attr-error'

export interface UuidConfig {
  optional?: boolean
}

function checkPresence(val: any, config: UuidConfig) {
  if (config.optional) return

  if (val === undefined || val === null || val === '') {
    throw new AttrError(AttrErrorCode.IsEmpty)
  }
}

function checkType(val: any) {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  if (typeof val !== 'string' || !regex.test(val)) {
    throw new AttrError(AttrErrorCode.NotUuid)
  }
}

export function checkUuid(val: any, config: UuidConfig) {
  checkPresence(val, config)
  checkType(val)
}
