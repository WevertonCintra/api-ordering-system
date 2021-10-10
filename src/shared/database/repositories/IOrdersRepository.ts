import { IOrderDTO } from '@modules/orders/dtos/IOrderDTO'
import { Order } from '@shared/database/entities/Order'

interface IOrdersRepository {
  create(data: IOrderDTO): Promise<Order>
  findById(id: string): Promise<Order>
  findByOrderId(id: string): Promise<Order>
  listByOrderForClient(client_id: string): Promise<Order[]>
  list(): Promise<Order[]>
  deleteById(id: string): Promise<void>
  save(order: Order): Promise<Order>
}

export { IOrdersRepository }
