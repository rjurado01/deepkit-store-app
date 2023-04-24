import {isInstance, isString, isUuid, ValidatedClass} from '../../../lib/class-attrs'

export class UserFilter extends ValidatedClass<UserFilter> {
  @isUuid({optional: true})
  readonly id?: string

  @isString({optional: true})
  readonly email?: string
}

export class UserCriteria extends ValidatedClass<UserCriteria> {
  @isInstance({of: UserFilter, optional: true, cast: true})
  readonly filter?: UserFilter
}
