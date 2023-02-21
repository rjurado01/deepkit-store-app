import {ConstraintError, ConstraintErrorCode} from '../validation/attr-error'

export interface FloatConfig {
  optional?: boolean
  min?: number
  max?: number
  cast?: boolean
}

function checkPresence(val: any, config: FloatConfig) {
  if (val !== undefined && val !== null) return true

  if (config.optional) return false

  throw new ConstraintError(ConstraintErrorCode.IsEmpty)
}

function checkType(val: any) {
  if (typeof val !== 'number' && !isNaN(val)) {
    throw new ConstraintError(ConstraintErrorCode.NotFloat)
  }
}

function checkMax(val: number, config: FloatConfig) {
  if (config.max && val > config.max) {
    throw new ConstraintError(ConstraintErrorCode.GreaterThanMax)
  }
}

function checkMin(val: number, config: FloatConfig) {
  if (config.min && val < config.min) {
    throw new ConstraintError(ConstraintErrorCode.LessThanMin)
  }
}

function cast(val: any, config: FloatConfig) {
  if (!config.cast) return val

  const result = parseFloat(val)

  return result || result === 0 ? result : val
}

export function processFloat(val: any, config: FloatConfig) {
  checkPresence(val, config)

  if (!val) return

  const newVal = cast(val, config)

  checkType(val)
  checkMax(val, config)
  checkMin(val, config)

  return newVal
}
