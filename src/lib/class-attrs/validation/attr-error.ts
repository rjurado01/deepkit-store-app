export enum ConstraintErrorCode {
  IsEmpty = 'IsEmpty',

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
