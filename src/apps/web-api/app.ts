import 'reflect-metadata'

import express from 'express'
import Router from 'express-promise-router'
import bodyParser from 'body-parser'

import {productsRouter} from './routes/products.route'
import {authRouter} from './routes/auth.route'
import {CriteriaValidationError} from '../../core/shared/domain/criteria'
import {ClassValidationError} from '../../lib/class-attrs/validation/attr-error'
import {NotFoundError} from '../../core/shared/domain/not-found.error'
import {generalRouter} from './routes/general.route'

const app = express()
const router = Router()
const port = 3000

app.use(bodyParser.json()) // must go before router
app.use(router)

router.get('/', (_req, res) => {
  res.send('Hello World 2!')
})

productsRouter.register(router)
authRouter.register(router)
generalRouter.register(router)

router.use((err: unknown, _req: any, res: any, _next: unknown) => {
  if (err instanceof CriteriaValidationError) {
    res.status(400).send(err.errors)
  } else if (err instanceof ClassValidationError) {
    res.status(422).send({errors: err.errors})
  } else if (err instanceof NotFoundError) {
    res.status(404).send(err)
  } else {
    // eslint-disable-next-line no-console
    console.dir(err)

    res.status(500).send('Something broke!')
  }
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`)
})
