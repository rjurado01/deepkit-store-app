import {AttrType, METADATA_KEY} from '../constants'
import {checkInteger} from '../validators/integer'
import {checkString} from '../validators/string'
import {AttrError} from './attr-error'

function validateAttr(value: any, config: any) {
  switch (config.type) {
    case AttrType.String:
      return checkString(value, config)

    case AttrType.Integer:
      return checkInteger(value, config)

    default:
      break
  }
}

export function validate(object: object) {
  const attrs = Reflect.getMetadata(METADATA_KEY, object) as Record<
    string,
    Attr
  >

  const errors = []

  for (const [key, config] of Object.entries(attrs)) {
    try {
      validateAttr(object[key as keyof object], config)
    } catch (err) {
      if (err instanceof AttrError) {
        errors.push(err)
      } else {
        throw err
      }
    }
  }

  if (errors.length > 0) throw errors
}
