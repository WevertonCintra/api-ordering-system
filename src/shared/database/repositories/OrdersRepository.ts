import { getRepository, Repository } from 'typeorm'

import { IOrdersRepository } from './IOrdersRepository'
import { IOrderDTO } from '@modules/orders/dtos/IOrderDTO'
import { Order } from '@shared/database/entities/Order'

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>

  constructor() {
    this.repository = getRepository(Order)
  }

  async create({ client_id, delivery_date }: IOrderDTO): Promise<Order> {
    const createOrder = this.repository.create({ client_id, delivery_date })

    const order = await this.repository.save(createOrder)

    return order
  }

  async findById(id: string): Promise<Order> {
    const order = await this.repository.findOne(id)

    return order
  }

  async findByOrderId(id: string): Promise<Order> {
    const order = await this.repository.findOne(id, {
      relations: ['client']
    })

    return order
  }

  async listByOrderForClient(client_id: string): Promise<Order[]> {
    const orders = await this.repository.find({
      where: { client_id },
      relations: ['client']
    })

    return orders
  }

  async list(): Promise<Order[]> {
    const orders = await this.repository.find({
      order: {
        delivery_date: 'ASC'
      },
      relations: ['client']
    })

    return orders
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async save(order: Order): Promise<Order> {
    return this.repository.save(order)
  }
}

export { OrdersRepository }
