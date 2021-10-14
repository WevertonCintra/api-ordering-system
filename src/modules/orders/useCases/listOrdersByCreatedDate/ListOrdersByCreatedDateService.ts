import { inject, injectable } from 'tsyringe'

import { IOrdersRepository } from '@shared/database/repositories/IOrdersRepository'
import { Order } from '@shared/database/entities/Order'

@injectable()
class ListOrdersByCreatedDateService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute(): Promise<Order[]> {
    const orders = await this.ordersRepository.listOrdersByCreatedDate()

    return orders
  }
}

export { ListOrdersByCreatedDateService }