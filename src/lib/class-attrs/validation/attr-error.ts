import {ClassConstructor} from '../../../types/global'

export enum ConstraintErrorCode {
  IsEmpty = 'IsEmpty',
  IsInvalid = 'IsInvalid',

  NotString = 'NotString',
  MaxLength = 'MaxLength',
  MinLength = 'MinLength',

  NotFloat = 'NotFloat',
  NotInteger = 'NotInteger',
  GreaterThanMax = 'GreaterThanMax',
  LessThanMin = 'LessThanMin',

  NotUuid = 'NotUuid',

  NotDate = 'NotDate',

  NotInstance = 'NotInstance',
  NotArray = 'NotArray',
}

export class ConstraintError {
  constructor(readonly code: ConstraintErrorCode, readonly info?: Record<string, any>) {}
}

export class AttrError {
  constructor(readonly path: string, readonly value: any, readonly error: ConstraintError) {}
}

export class ClassValidationError extends Error {
  readonly errors: AttrError[]

  constructor(msg: string, errors: AttrError[]) {
    super(msg)

    this.errors = errors
  }
}

export class ClassValidation<T extends object> {
  readonly errors: AttrError[]
  readonly klass: ClassConstructor<T>

  constructor(klass: ClassConstructor<T>) {
    this.klass = klass
    this.errors = []
  }

  addError(error: AttrError) {
    this.errors.push(error)
  }

  catchAttrError(err: unknown) {
    if (err instanceof AttrError) {
      this.addError(err)
    } else {
      throw err
    }
  }

  catchValidationError(err: unknown) {
    if (err instanceof ClassValidationError) {
      err.errors.forEach(this.addError)
    } else {
      throw err
    }
  }

  hasErrors() {
    return Object.keys(this.errors).length > 0
  }

  ensureIsValid() {
    if (this.hasErrors()) {
      throw new ClassValidationError(`Invalid ${this.klass.name}`, this.errors)
    }
  }
}
