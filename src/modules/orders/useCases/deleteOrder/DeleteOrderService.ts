import { inject, injectable } from 'tsyringe'

import { IOrdersRepository } from '@shared/database/repositories/IOrdersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const order = await this.ordersRepository.findById(id)

    if (!order) {
      throw new AppError('Order does not exists!')
    }

    await this.ordersRepository.deleteById(order.id)
  }
}

export { DeleteOrderService }