import {ConstraintError, ConstraintErrorCode} from '../validation/attr-error'

export interface EnumConfig {
  enum: Record<string, string | number>
  optional?: boolean
  cast?: boolean
}

function checkPresence(val: any, config: EnumConfig) {
  if ((val === undefined || val === null) && !config.optional) {
    throw new ConstraintError(ConstraintErrorCode.IsEmpty)
  }
}

function checkType(val: any, config: EnumConfig) {
  if (!Object.values(config.enum).includes(val)) {
    throw new ConstraintError(ConstraintErrorCode.NotDate)
  }
}

function cast(val: any, config: EnumConfig) {
  if (!config.cast) return val

  const result = Object.values(config.enum).find(value => {
    if (typeof value === 'string' && value === String(val)) return true
    if (typeof value === 'number' && value === parseInt(val)) return true
  })

  return result || result === 0 ? result : val
}

export function processEnum(val: any, config: EnumConfig) {
  checkPresence(val, config)

  if (!val) return

  const newVal = cast(val, config)

  checkType(newVal, config)

  return newVal
}
