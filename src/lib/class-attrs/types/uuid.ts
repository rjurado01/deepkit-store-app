import {ConstraintError, ConstraintErrorCode} from '../validation/attr-error'

export interface UuidConfig {
  optional?: boolean
}

function checkPresence(val: any, config: UuidConfig) {
  if ((val === undefined || val === null || val === '') && !config.optional) {
    throw new ConstraintError(ConstraintErrorCode.IsEmpty)
  }
}

function checkType(val: any) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  if (typeof val !== 'string' || !regex.test(val)) {
    throw new ConstraintError(ConstraintErrorCode.NotUuid)
  }
}

export function processUuid(val: any, config: UuidConfig) {
  checkPresence(val, config)

  if (!val) return

  checkType(val)

  return val
}
