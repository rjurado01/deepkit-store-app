import {Service} from 'diod'
import {Request, Response} from 'express'
import {ShowStatsService} from '../services/show-stats.service'

@Service()
export class StatsShowController {
  constructor(private service: ShowStatsService) {}

  async run(req: Request, res: Response) {
    const result = await this.service.run()

    res.send(result)
  }
}
