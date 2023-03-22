import {AttrError, AttrErrorCode} from '../validation/attr-error'

export interface IntegerConfig {
  optional?: boolean
  min?: number
  max?: number
}

function checkPresence(val: any, config: IntegerConfig) {
  if (config.optional) return

  if (val === undefined || val === null || val === '') {
    throw new AttrError(AttrErrorCode.IsEmpty)
  }
}

function checkType(val: any) {
  if (typeof val !== 'number' || !Number.isInteger(val)) {
    throw new AttrError(AttrErrorCode.NotInteger)
  }
}

function checkMax(val: number, config: IntegerConfig) {
  if (config.max && val > config.max) {
    throw new AttrError(AttrErrorCode.GreaterThanMax)
  }
}

function checkMin(val: number, config: IntegerConfig) {
  if (config.min && val < config.min) {
    throw new AttrError(AttrErrorCode.LessThanMin)
  }
}

export function checkInteger(val: any, config: IntegerConfig) {
  checkPresence(val, config)
  checkType(val)
  checkMax(val, config)
  checkMin(val, config)
}
