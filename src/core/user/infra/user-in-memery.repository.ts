import {Service} from 'diod'
import {InMemoryRepository} from '../../shared/infra/in-memory.repository'
import {UserNotFoundError} from '../domain/user-not-found.error'
import {UserCriteria, UserFilter} from '../domain/user.criteria'
import {User} from '../domain/user.entity'
import {UserRepository} from '../domain/user.repository'

@Service()
export class UserInMemeoryRepository
  extends InMemoryRepository<User, UserCriteria>
  implements UserRepository
{
  constructor() {
    super()

    this.items = [
      new User({
        id: '0ba04dca-74fe-4c5c-af65-46c37a344937',
        name: 'User 1',
        email: 'user1@email.com',
        createdDate: new Date(),
      }),
    ]
  }

  protected applyFilter(filter: UserFilter, users: User[]) {
    return users.filter(item => {
      const id = !filter?.id || item.id === filter.id

      const email = !filter?.email || item.email.toLowerCase() === filter.email.toLowerCase()

      return id && email
    })
  }

  protected notFound(filter: UserFilter) {
    throw new UserNotFoundError(filter)
  }
}
