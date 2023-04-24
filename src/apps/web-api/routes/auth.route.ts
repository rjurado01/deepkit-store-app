import {IRouter} from 'express'
import {SessionsCreateController} from '../controllers/sessions-create.controller'
import {container} from '../di-container'

const authRouter = {
  register: (router: IRouter) => {
    const createSessionController = container.get(SessionsCreateController)

    router.post('/sessions', createSessionController.run.bind(createSessionController))
  },
}

export {authRouter}
