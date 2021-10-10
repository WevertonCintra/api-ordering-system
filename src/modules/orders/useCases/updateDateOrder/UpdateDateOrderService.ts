import { inject, injectable } from 'tsyringe'

import { IOrderDTO } from '@modules/orders/dtos/IOrderDTO'
import { IOrdersRepository } from '@shared/database/repositories/IOrdersRepository'
import { Order } from '@shared/database/entities/Order'
import { AppError } from '@shared/errors/AppError'

@injectable()
class UpdateDateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute({ id, delivery_date }: IOrderDTO): Promise<Order> {
    const order = await this.ordersRepository.findById(id)

    if (!order) {
      throw new AppError('Order does not exists!')
    }

    order.delivery_date = delivery_date

    const orderSave = await this.ordersRepository.save(order)

    return orderSave
  }
}

export { UpdateDateOrderService }