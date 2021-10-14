import { inject, injectable } from 'tsyringe'

import { IOrderDTO } from '@modules/orders/dtos/IOrderDTO'
import { IOrdersRepository } from '@shared/database/repositories/IOrdersRepository'
import { Order } from '@shared/database/entities/Order'
import { AppError } from '@shared/errors/AppError'

@injectable()
class UpdateStatusDeliveryOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute({ id, status_delivery }: IOrderDTO): Promise<Order> {
    const order = await this.ordersRepository.findByOrderId(id)

    if (!order) {
      throw new AppError('Order does not exists!')
    }

    order.status_delivery = status_delivery

    const orderSave = await this.ordersRepository.save(order)

    return orderSave
  }
}

export { UpdateStatusDeliveryOrderService }