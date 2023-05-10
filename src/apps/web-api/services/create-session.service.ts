import {Service} from 'diod'
import jwt from 'jsonwebtoken'
import {ShowUserService} from '../../../core/user/app/show-user.service'
import {UserFilter} from '../../../core/user/domain/user.criteria'
import {isString, ValidatedClass} from '../../../lib/class-attrs'

export class CreateSessionDto extends ValidatedClass<CreateSessionDto> {
  @isString()
  email: string

  @isString()
  password: string
}

@Service()
export class CreateSessionService {
  constructor(private readonly showUserService: ShowUserService) {}

  async run(dto: CreateSessionDto): Promise<{jwt: string}> {
    const filter = new UserFilter({email: dto.email})
    const user = await this.showUserService.run(filter)
    const jwt = this.generateAccessToken({id: user.id})

    return {jwt}
  }

  private generateAccessToken(payload: {id: string}): string {
    // TODO: coger el token de un objeto config
    return jwt.sign(payload, 'process.env.TOKEN_SECRET', {expiresIn: '3600s'})
  }
}
