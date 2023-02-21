import {ConstraintError, ConstraintErrorCode} from '../validation/attr-error'

export interface InstanceConfig {
  of: new (...args: any[]) => any
  optional?: boolean
  array?: boolean
  cast?: boolean
}

function checkPresence(val: any, config: InstanceConfig) {
  if ((val === undefined || val === null) && !config.optional) {
    throw new ConstraintError(ConstraintErrorCode.IsEmpty)
  }
}

function checkType(val: any, config: InstanceConfig) {
  if (!(val instanceof config.of)) {
    throw new ConstraintError(ConstraintErrorCode.NotInstance)
  }
}

function cast(val: any, config: InstanceConfig) {
  if (!config.cast || val instanceof config.of) return val

  return new config.of(val)
}

export function processInstance(val: any, config: InstanceConfig) {
  checkPresence(val, config)

  if (!val) return

  const newVal = cast(val, config)

  checkType(newVal, config)

  return newVal
}
