import {isDate, isString, isUuid, ValidatedClass} from '../../../lib/class-attrs'

export class User extends ValidatedClass<User> {
  @isUuid()
  readonly id: string

  @isString()
  readonly name: string

  @isString()
  readonly email: string

  @isDate()
  readonly createdDate: Date = new Date()

  // METHODS

  update(data: Partial<Pick<Properties<User>, 'name' | 'email'>>) {
    this.assign(data, ['name', 'email'])
  }
}
