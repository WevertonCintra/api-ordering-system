import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { ensureUserAdmin } from '@shared/http/middlewares/ensureUserAdmin'
import { ensureAuthenticated } from '@shared/http/middlewares/ensureAuthenticated'
import { AuthenticateUserController } from '@modules/accounts/useCases/authenticatedUser/AuthenticateUserController'
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController'
import { DeleteUserController } from '@modules/accounts/useCases/deleteUser/DeleteUserController'
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController'
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController'

const usersRouter = Router()

const authenticateUserController = new AuthenticateUserController()
const createUserController = new CreateUserController()
const deleteUserController = new DeleteUserController()
const listUsersController = new ListUsersController()
const updateUserController = new UpdateUserController()

usersRouter.post('/session', 
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().required()
    }}), 
authenticateUserController.handle)

usersRouter.post('/users', 
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().required()
    }}), 
ensureAuthenticated, ensureUserAdmin, createUserController.handle)

usersRouter.delete('/users/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }}), 
ensureAuthenticated, ensureUserAdmin, deleteUserController.handle)

usersRouter.get('/users', ensureAuthenticated, ensureUserAdmin, listUsersController.handle)

usersRouter.put('/users/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().required(),
      manager: Joi.boolean().required()
    }}), 
ensureAuthenticated, ensureUserAdmin, updateUserController.handle)

export { usersRouter }