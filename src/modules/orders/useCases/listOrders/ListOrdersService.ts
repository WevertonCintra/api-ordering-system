import { inject, injectable } from 'tsyringe'

import { IOrdersRepository } from '@shared/database/repositories/IOrdersRepository'
import { Order } from '@shared/database/entities/Order'

@injectable()
class ListOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute(): Promise<Order[]> {
    const orders = await this.ordersRepository.listOrders()

    return orders
  }
}

export { ListOrdersService }