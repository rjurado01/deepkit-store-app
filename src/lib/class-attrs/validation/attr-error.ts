export enum AttrErrorCode {
  IsEmpty = 'IsEmpty',

  NotString = 'NotString',
  MaxLength = 'MaxLength',
  MinLength = 'MinLength',

  NotInteger = 'NotInteger',
  GreaterThanMax = 'GreaterThanMax',
  LessThanMin = 'LessThanMin',

  NotUuid = 'NotUuid',
}

export class AttrError {
  constructor(
    readonly code: AttrErrorCode,
    readonly info?: Record<string, any>,
  ) {}
}
