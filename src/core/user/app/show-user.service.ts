import {Service} from 'diod'
import {UserFilter} from '../domain/user.criteria'
import {User} from '../domain/user.entity'
import {UserRepository} from '../domain/user.repository'

export interface ShowUserView extends Properties<User> {}

@Service()
export class ShowUserService {
  constructor(private readonly repository: UserRepository) {}

  async run(filter: UserFilter): Promise<ShowUserView> {
    const user = await this.repository.findOne(filter)

    return user
  }
}
