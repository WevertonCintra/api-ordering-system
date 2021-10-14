import { inject, injectable } from 'tsyringe'

import { IOrderDTO } from '@modules/orders/dtos/IOrderDTO'
import { IOrdersRepository } from '@shared/database/repositories/IOrdersRepository'
import { Order } from '@shared/database/entities/Order'
import { AppError } from '@shared/errors/AppError'

@injectable()
class UpdateStatusPaidOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute({ id, status_paid }: IOrderDTO): Promise<Order> {
    const order = await this.ordersRepository.findByOrderId(id)

    if (!order) {
      throw new AppError('Order does not exists!')
    }

    order.status_paid = status_paid

    const orderSave = await this.ordersRepository.save(order)

    return orderSave
  }
}

export { UpdateStatusPaidOrderService }