import {Service} from 'diod'
import {UserNotFoundError} from '../domain/user-not-found.error'
import {UserCriteria, UserFilter} from '../domain/user.criteria'
import {User} from '../domain/user.entity'
import {UserRepository} from '../domain/user.repository'

@Service()
export class UserInMemeoryRepository implements UserRepository {
  private users: User[] = [
    new User({
      id: '0ba04dca-74fe-4c5c-af65-46c37a344937',
      name: 'User 1',
      email: 'user1@email.com',
      createdDate: new Date(),
    }),
  ]

  findAll(query?: UserCriteria | undefined): Promise<User[]> {
    let result = this.users

    if (query?.filter) {
      result = this.applyFilter(query.filter, result)
    }

    return Promise.resolve(result)
  }

  findOne(filter: UserFilter): Promise<User> {
    console.log(filter)
    const item = this.applyFilter(filter, this.users)[0]

    if (!item) throw new UserNotFoundError(filter)

    return Promise.resolve(item)
  }

  count(_query?: UserCriteria | undefined): Promise<number> {
    return Promise.resolve(this.users.length)
  }

  async create(user: User): Promise<void> {
    this.users.push(user)
  }

  async update(user: User): Promise<void> {
    this.users.splice(this.findIndex(user), 1, user)

    return Promise.resolve()
  }

  async delete(user: User): Promise<void> {
    this.users.splice(this.findIndex(user), 1)

    return Promise.resolve()
  }

  async clear() {
    this.users = []
  }

  private applyFilter(filter: UserFilter, users: User[]) {
    return users.filter(item => {
      const id = !filter?.id || item.id === filter.id

      const email = !filter?.email || item.email.toLowerCase() === filter.email.toLowerCase()

      return id && email
    })
  }

  private findIndex(user: User): number {
    const index = this.users.findIndex(item => item.id === user.id)

    if (index < 0) throw new UserNotFoundError(new UserFilter({id: user.id}))

    return index
  }
}
