import {isInstance, isString, isUuid, ValidatedClass} from '../../../lib/class-attrs'
import {CriteriaPage} from '../../shared/domain/criteria'

export class UserFilter extends ValidatedClass<UserFilter> {
  @isUuid({optional: true})
  readonly id?: string

  @isString({optional: true})
  readonly email?: string
}

export class UserCriteria extends ValidatedClass<UserCriteria> {
  @isInstance({of: UserFilter, optional: true, cast: true})
  readonly filter?: UserFilter

  @isInstance({of: CriteriaPage, optional: true, cast: true})
  readonly page?: CriteriaPage
}
