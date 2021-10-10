import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { ensureUserManager } from '@shared/http/middlewares/ensureManager'
import { ensureAuthenticated } from '@shared/http/middlewares/ensureAuthenticated'
import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController'
import { DeleteClientController } from '@modules/clients/useCases/deleteClient/DeleteClientController'
import { ShowClientController } from '@modules/clients/useCases/showClient/ShowClientController'
import { ListClientsController } from '@modules/clients/useCases/listClients/ListClientsController'

import { UpdateClientController } from '@modules/clients/useCases/updateClient/UpdateClientController'

const clientsRouter = Router()

const createClientController = new CreateClientController()
const deleteClientController = new DeleteClientController()
const listClientsController = new ListClientsController()
const showClientController = new ShowClientController()
const updateClientController = new UpdateClientController()

clientsRouter.post('/clients', 
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().allow(null, ''),
      city: Joi.boolean().valid('local', 'another_city').required()
    }}), 
ensureAuthenticated, createClientController.handle)

clientsRouter.delete('/clients/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }}), 
ensureAuthenticated, ensureUserManager, deleteClientController.handle)

clientsRouter.get('/clients', ensureAuthenticated, listClientsController.handle)

clientsRouter.get('/clients/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }}), 
ensureAuthenticated, showClientController.handle)

clientsRouter.put('/clients/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
      city: Joi.boolean().valid('local', 'another_city').required()
    }}), 
ensureAuthenticated, updateClientController.handle)

export { clientsRouter }