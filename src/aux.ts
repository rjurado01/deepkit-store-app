import 'reflect-metadata'
import util from 'util'

const enum AttrType {
  Uuid,
  Integer,
  String,
  Instane,
}

const enum AttrErrorCode {
  NotString = 'NotString',
  NotInteger = 'NotInteger',
  NotUuid = 'NotUuid',
}

type Attr = {
  type: AttrType
}

type AttrError = {
  error: AttrErrorCode
}

const METADATA_KEY = 'attributes'

function isString(options = {}) {
  return function (target: any, propertyKey: string | symbol): void {
    const attrs = Reflect.getMetadata(METADATA_KEY, target) || {}

    attrs[propertyKey] = {...options, type: AttrType.String}

    Reflect.defineMetadata(METADATA_KEY, attrs, target)
  }
}

function isInteger(options = {}) {
  return function (target: any, propertyKey: string | symbol): void {
    const attrs = Reflect.getMetadata(METADATA_KEY, target) || {}

    attrs[propertyKey] = {...options, type: AttrType.Integer}

    Reflect.defineMetadata(METADATA_KEY, attrs, target)
  }
}

function isUuid(options = {}) {
  return function (target: any, propertyKey: string | symbol): void {
    const attrs = Reflect.getMetadata(METADATA_KEY, target) || {}

    attrs[propertyKey] = {...options, type: AttrType.Uuid}

    Reflect.defineMetadata(METADATA_KEY, attrs, target)
  }
}

class InvalidEntity {
  constructor(public errors: Record<string, AttrError>) {}
}

export class Entity<T> {
  constructor(data: T) {
    const attrs = Reflect.getMetadata(METADATA_KEY, this) as Record<
      string,
      Attr
    >

    for (const key in attrs) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const val = data[key]

      if (val) Object.assign(this, {[key]: val})
    }

    this.validate()
  }

  validate() {
    const attrs = Reflect.getMetadata(METADATA_KEY, this) as Record<
      string,
      Attr
    >

    const errors = {}

    for (const [key, options] of Object.entries(attrs)) {
      const value: any = this[key as keyof this]

      switch (options.type) {
        case AttrType.String:
          if (typeof value !== 'string')
            this.addError(errors, key, AttrErrorCode.NotString)
          break

        case AttrType.Integer:
          if (typeof value !== 'number' || !Number.isInteger(value))
            this.addError(errors, key, AttrErrorCode.NotInteger)
          break

        case AttrType.Uuid:
          const regex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i

          if (typeof value !== 'string' || !regex.test(value))
            this.addError(errors, key, AttrErrorCode.NotUuid)
          break

        default:
          break
      }
    }

    if (Object.keys(errors).length > 0) throw new InvalidEntity(errors)
  }

  addError(
    errors: Record<string, AttrError>,
    key: string,
    error: AttrErrorCode,
    info: Record<string, any> = {},
  ) {
    errors[key] ||= {...info, error: error}
  }
}

export class ProductFilter extends Entity<ProductFilter> {
  @isUuid()
  readonly id?: string

  @isInteger()
  readonly aux: number

  @isString()
  readonly search?: string
}

const uuid = '572db907-1aee-498e-b25d-78d22ad6fbfe'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const x = new ProductFilter({id: uuid, aux: 2, search: 'asdf', other: 99})
console.dir(x)
