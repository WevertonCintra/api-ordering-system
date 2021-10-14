import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { ensureUserManager } from '@shared/http/middlewares/ensureManager'
import { ensureAuthenticated } from '@shared/http/middlewares/ensureAuthenticated'
import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController'
import { DeleteClientController } from '@modules/clients/useCases/deleteClient/DeleteClientController'
import { ListClientsController } from '@modules/clients/useCases/listClients/ListClientsController'

const clientsRouter = Router()

const createClientController = new CreateClientController()
const deleteClientController = new DeleteClientController()
const listClientsController = new ListClientsController()

clientsRouter.post('/clients', 
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      city: Joi.string().required()
    }}), 
ensureAuthenticated, createClientController.handle)

clientsRouter.delete('/clients/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }}), 
ensureAuthenticated, ensureUserManager, deleteClientController.handle)

clientsRouter.get('/clients', ensureAuthenticated, listClientsController.handle)

export { clientsRouter }