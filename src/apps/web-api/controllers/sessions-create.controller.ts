import {Request, Response} from 'express'
import {UserNotFoundError} from '../../../core/user/domain/user-not-found.error'
import {injectable} from '../../../shared/decorators/injectable'
import {CreateSessionDto, CreateSessionService} from '../services/create-session.service'

@injectable()
export class SessionsCreateController {
  constructor(private readonly service: CreateSessionService) {}

  // https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
  async run(req: Request, res: Response) {
    const dto = new CreateSessionDto(req.body)

    try {
      const result = await this.service.run(dto)

      res.status(201).send(result)
    } catch (err) {
      if (err instanceof UserNotFoundError) res.status(401).send()

      throw err
    }
  }
}
