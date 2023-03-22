import {AttrError, AttrErrorCode} from '../validation/attr-error'

export interface StringConfig {
  optional?: boolean
  maxLength?: number
  minLength?: number
}

function checkPresence(val: any, config: StringConfig) {
  if (config.optional) return

  if (val === undefined || val === null || val === '') {
    throw new AttrError(AttrErrorCode.IsEmpty)
  }
}

function checkType(val: any) {
  if (typeof val !== 'string') {
    throw new AttrError(AttrErrorCode.NotString)
  }
}

function checkMaxLength(val: any, config: StringConfig) {
  if (config.maxLength && val.length > config.maxLength) {
    throw new AttrError(AttrErrorCode.MaxLength)
  }
}

function checkMinLength(val: any, config: StringConfig) {
  if (config.minLength && val.length < config.minLength) {
    throw new AttrError(AttrErrorCode.MinLength)
  }
}

export function checkString(val: any, config: StringConfig) {
  checkPresence(val, config)
  checkType(val)
  checkMaxLength(val, config)
  checkMinLength(val, config)
}
