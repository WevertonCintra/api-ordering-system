import { Router } from 'express'

import { usersRouter } from './users.routes'
import { clientsRouter } from './clients.routes'
import { ordersRouter } from './orders.routes'

const routes = Router()

routes.use(usersRouter)
routes.use(clientsRouter)
routes.use(ordersRouter)

export { routes }
