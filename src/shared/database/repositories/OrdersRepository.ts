import { getRepository, Repository } from 'typeorm'

import { IOrdersRepository } from './IOrdersRepository'
import { IOrderDTO } from '@modules/orders/dtos/IOrderDTO'
import { Order } from '@shared/database/entities/Order'

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>

  constructor() {
    this.repository = getRepository(Order)
  }

  async create({ client_id, created_date, delivery_date }: IOrderDTO): Promise<Order> {
    const createOrder = this.repository.create({ client_id, created_date, delivery_date })

    const order = await this.repository.save(createOrder)

    return order
  }

  async findByOrderId(id: string): Promise<Order> {
    const order = await this.repository.findOne(id)

    return order
  }

  async listOrders(): Promise<Order[]> {
    const orders = await this.repository.find({
      relations: ['client']
    })

    return orders
  }

  async listOrdersByCreatedDate(): Promise<Order[]> {
    const orders = await this.repository.find({
      order: {
        created_at: 'ASC'
      },
      relations: ['client']
    })

    return orders
  }

  async listOrdersByDeliveryDate(): Promise<Order[]> {
    const orders = await this.repository.find({
      order: {
        delivery_date: 'ASC'
      },
      relations: ['client']
    })

    return orders
  }

  async deleteByOrderId(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async countOrdersStatus(): Promise<number> {
    const total = await this.repository.count({
      where: {
        status: false
      }
    }) 

    return total
  }

  async countOrdersStatusDelivery(): Promise<number> {
    const total = await this.repository.count({
      where: {
        status_delivery: false
      }
    }) 

    return total
  }

  async countOrdersStatusPaid(): Promise<number> {
    const total = await this.repository.count({
      where: {
        status_paid: false
      }
    }) 

    return total
  }

  async save(order: Order): Promise<Order> {
    return this.repository.save(order)
  }
}

export { OrdersRepository }
