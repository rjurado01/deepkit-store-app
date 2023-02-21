import {ConstraintError, ConstraintErrorCode} from '../validation/attr-error'

export interface StringConfig {
  optional?: boolean
  maxLength?: number
  minLength?: number
  array?: boolean
  cast?: boolean
}

function checkPresence(val: any, config: StringConfig) {
  if ((val === undefined || val === null || val === '') && !config.optional) {
    throw new ConstraintError(ConstraintErrorCode.IsEmpty)
  }
}

function checkType(val: any) {
  if (typeof val !== 'string') {
    throw new ConstraintError(ConstraintErrorCode.NotString)
  }
}

function checkMaxLength(val: any, config: StringConfig) {
  if (config.maxLength && val.length > config.maxLength) {
    throw new ConstraintError(ConstraintErrorCode.MaxLength)
  }
}

function checkMinLength(val: any, config: StringConfig) {
  if (config.minLength && val.length < config.minLength) {
    throw new ConstraintError(ConstraintErrorCode.MinLength)
  }
}

function cast(val: any, config: StringConfig) {
  if (!config.cast || typeof val === 'string') return val

  return String(val)
}

export function processString(val: any, config: StringConfig) {
  checkPresence(val, config)

  if (!val) return

  const newVal = cast(val, config)

  checkType(newVal)
  checkMaxLength(newVal, config)
  checkMinLength(newVal, config)

  return newVal
}
