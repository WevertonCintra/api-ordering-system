import { inject, injectable } from 'tsyringe'

import { IClientsRepository } from '@shared/database/repositories/IClientsRepository'
import { IOrdersRepository } from '@shared/database/repositories/IOrdersRepository'
import { IOrderDTO } from '@modules/orders/dtos/IOrderDTO'
import { Order } from '@shared/database/entities/Order'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute({ client_id, created_date, delivery_date }: IOrderDTO): Promise<Order> {
    const client = await this.clientsRepository.findClientById(client_id)

    if (!client) {
      throw new AppError('Client does not exists!');
    }

    const order = await this.ordersRepository.create({ client_id, created_date, delivery_date })

    return order
  }
}

export { CreateOrderService }
