import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import { ensureAuthenticated } from '@shared/http/middlewares/ensureAuthenticated'
import { CreateOrderController } from '@modules/orders/useCases/createOrder/CreateOrderController'
import { DeleteOrderController } from '@modules/orders/useCases/deleteOrder/DeleteOrderController'
import { ListOrdersController } from '@modules/orders/useCases/listOrders/ListOrdersController'
import { ListOrdersByCreatedDateController } from '@modules/orders/useCases/listOrdersByCreatedDate/ListOrdersByCreatedDateController'
import { ListOrdersByDeliveryDateController } from '@modules/orders/useCases/listOrdersByDeliveryDate/ListOrdersByDeliveryDateController'
import { ListTotalOrdersController } from '@modules/orders/useCases/listTotalOrders/ListTotalOrdersController'
import { ShowOrderController } from '@modules/orders/useCases/showOrder/ShowOrderController'
import { UpdateDeliveryDateOrderController } from '@modules/orders/useCases/updateDeliveryDateOrder/UpdateDeliveryDateOrderController'
import { UpdateStatusDeliveryOrderController } from '@modules/orders/useCases/updateStatusDeliveryOrder/UpdateStatusDeliveryOrderController'
import { UpdateStatusOrderController } from '@modules/orders/useCases/updateStatusOrder/UpdateStatusOrderController'
import { UpdateStatusPaidOrderController } from '@modules/orders/useCases/updateStatusPaidOrder/UpdateStatusPaidOrderController'

const ordersRouter = Router()

const createOrderController = new CreateOrderController()
const deleteOrderController = new DeleteOrderController()
const listOrdersController = new ListOrdersController()
const listOrdersByCreatedDateController = new ListOrdersByCreatedDateController()
const listOrdersByDeliveryDateController = new ListOrdersByDeliveryDateController()
const listTotalOrdersController = new ListTotalOrdersController()
const showOrderController = new ShowOrderController()
const updateDeliveryDateOrderController = new UpdateDeliveryDateOrderController()
const updateStatusDeliveryOrderController = new UpdateStatusDeliveryOrderController()
const updateStatusOrderController = new UpdateStatusOrderController()
const updateStatusPaidOrderController = new UpdateStatusPaidOrderController()

ordersRouter.post('/orders', 
  celebrate({
    [Segments.BODY]: {
      client_id: Joi.string().uuid().required(),
      created_date: Joi.string().required(),
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
ordersRouter.get('/orders/created', ensureAuthenticated, listOrdersByCreatedDateController.handle)
ordersRouter.get('/orders/delivery', ensureAuthenticated, listOrdersByDeliveryDateController.handle)
ordersRouter.get('/orders/total', ensureAuthenticated, listTotalOrdersController.handle)

ordersRouter.get('/orders/:id', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }}), 
ensureAuthenticated, showOrderController.handle)

ordersRouter.patch('/orders/:id/date', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      delivery_date: Joi.string().required()
    }}), 
ensureAuthenticated, updateDeliveryDateOrderController.handle)

ordersRouter.patch('/orders/:id/status-delivery', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      status_delivery: Joi.boolean().required()
    }}), 
ensureAuthenticated, updateStatusDeliveryOrderController.handle)

ordersRouter.patch('/orders/:id/status', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      status: Joi.boolean().required()
    }}), 
ensureAuthenticated, updateStatusOrderController.handle)

ordersRouter.patch('/orders/:id/status-paid', 
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
      status_paid: Joi.boolean().required()
    }}), 
ensureAuthenticated, updateStatusPaidOrderController.handle)

export { ordersRouter }
