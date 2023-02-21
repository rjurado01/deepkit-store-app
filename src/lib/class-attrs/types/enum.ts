import {ConstraintError, ConstraintErrorCode} from '../validation/attr-error'

export interface EnumConfig {
  enum: Record<string, string | number>
  optional?: boolean
}

function checkPresence(val: any, config: EnumConfig) {
  if (val !== undefined && val !== null) return true

  if (config.optional) return false

  throw new ConstraintError(ConstraintErrorCode.IsEmpty)
}

function checkType(val: any, config: EnumConfig) {
  if (!Object.values(config.enum).includes(val)) {
    throw new ConstraintError(ConstraintErrorCode.NotDate)
  }
}

export function processEnum(val: any, config: EnumConfig) {
  if (checkPresence(val, config)) {
    checkType(val, config)
  }
}
