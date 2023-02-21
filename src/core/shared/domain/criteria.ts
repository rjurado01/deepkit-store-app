import {ValidatedClass} from '../../../lib/class-attrs'
import {ClassValidationError} from '../../../lib/class-attrs/validation/attr-error'

export class CriteriaValidationError extends ClassValidationError {}

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
