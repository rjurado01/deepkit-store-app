import {isInteger, ValidatedClass} from '../../../lib/class-attrs'
import {ClassValidationError} from '../../../lib/class-attrs/validation/attr-error'

export class CriteriaValidationError extends ClassValidationError {}

export class CriteriaPage extends ValidatedClass<CriteriaPage> {
  @isInteger({min: 1, optional: true, cast: true})
  size?: number

  @isInteger({min: 1, max: 50, optional: true, cast: true})
  number?: number
}

export class Criteria<T> extends ValidatedClass<T> {
  readonly filter?: unknown
  readonly order?: unknown
  readonly page?: unknown

  constructor(data: Partial<Properties<T>>) {
    try {
      super(data)
    } catch (err) {
      if (err instanceof ClassValidationError) {
        throw new CriteriaValidationError(err.message, err.errors)
      }

      throw err
    }
  }
}
