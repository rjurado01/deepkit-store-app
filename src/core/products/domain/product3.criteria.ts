import {IsNumber} from 'class-validator'

const enum AttrType {
  Uuid,
  Integer,
  String,
  Instane,
}

const METADATA_KEY = 'attributes'

function attr(type: AttrType) {
  return function (target: any, propertyKey: string | symbol): void {
    console.log(target, propertyKey, type)
  }
}

function isString(options = {}) {
  return function (target: any, propertyKey: string | symbol): void {
    const attrs = Reflect.getMetadata(METADATA_KEY, target) || {}

    attrs[propertyKey] = {type: AttrType.String}

    Reflect.defineMetadata(METADATA_KEY, attrs, target)
  }
}

function isInteger(options = {}) {
  return function (target: any, propertyKey: string | symbol): void {
    console.log(target, propertyKey, options)
  }
}

function isUUID(options = {}) {
  return function (target: any, propertyKey: string | symbol): void {
    console.log(target, propertyKey, options)
  }
}

export class ProductFilter {
  @isUUID()
  readonly id?: string

  @isInteger()
  readonly aux: number

  @isString()
  readonly search?: string
}

export class ProductCriteria {
  @attr(AttrType.Instane)
  readonly filter?: ProductFilter

  readonly aux?: number
}
