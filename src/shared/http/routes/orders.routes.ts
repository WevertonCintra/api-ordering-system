import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { ensureAuthenticated } from '@shared/http/middlewares/ensureAuthenticated'
import { CreateOrderController } from '@modules/orders/useCases/createOrder/CreateOrderController'
import { DeleteOrderController } from '@modules/orders/useCases/deleteOrder/DeleteOrderController'
import { ListOrdersController } from '@modules/orders/useCases/listOrders/ListOrdersController'
import { ShowOrderController } from '@modules/orders/useCases/showOrder/ShowOrderController'
import { UpdateDateOrderController } from '@modules/orders/useCases/updateDateOrder/UpdateDateOrderController'
import { UpdateStatusOrderController } from '@modules/orders/useCases/updateStatusOrder/UpdateStatusOrderController'

const ordersRouter = Router()

const createOrderController = new CreateOrderController()
const deleteOrderController = new DeleteOrderController()
const listOrdersController = new ListOrdersController()
const showOrderController = new ShowOrderController()
const updateDateOrderController = new UpdateDateOrderController()
const updateStatusOrderController = new UpdateStatusOrderController()

ordersRouter.post('/orders', 
  celebrate({
    [Segments.BODY]: {
      client_id: Joi.string().uuid().required(),
      delivery_date: Joi.string().required()
    }}), 
ensureAuthenticated, createOrderController.handle)

ordersRouter.delete('/orders/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }}), 
ensureAuthenticated, deleteOrderController.handle)

ordersRouter.get('/orders', ensureAuthenticated, listOrdersController.handle)

ordersRouter.get('/orders/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }}), 
ensureAuthenticated, showOrderController.handle)

ordersRouter.patch('/orders/date/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      delivery_date: Joi.string().required()
    }}), 
ensureAuthenticated, updateDateOrderController.handle)

ordersRouter.patch('/orders/status/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      status: Joi.boolean().required()
    }}), 
ensureAuthenticated, updateStatusOrderController.handle)

export { ordersRouter }
