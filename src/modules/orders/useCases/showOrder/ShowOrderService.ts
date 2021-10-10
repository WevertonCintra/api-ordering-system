import { inject, injectable } from 'tsyringe'

import { IOrdersRepository } from '@shared/database/repositories/IOrdersRepository'
import { Order } from '@shared/database/entities/Order'
import { AppError } from '@shared/errors/AppError'

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute(id: string): Promise<Order> {
    const order = await this.ordersRepository.findByOrderId(id)

    if (!order) {
      throw new AppError('Order does not exists!')
    }

    return order
  }
}

export { ShowOrderService }