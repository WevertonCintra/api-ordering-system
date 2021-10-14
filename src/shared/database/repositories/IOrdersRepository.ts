import { IOrderDTO } from '@modules/orders/dtos/IOrderDTO'
import { Order } from '@shared/database/entities/Order'

interface IOrdersRepository {
  create(data: IOrderDTO): Promise<Order>
  findByOrderId(id: string): Promise<Order>
  listOrders(): Promise<Order[]>
  listOrdersByCreatedDate(): Promise<Order[]>
  listOrdersByDeliveryDate(): Promise<Order[]>
  deleteByOrderId(id: string): Promise<void>
  countOrdersStatus(): Promise<number>
  countOrdersStatusDelivery(): Promise<number>
  countOrdersStatusPaid(): Promise<number>
  save(order: Order): Promise<Order>
}

export { IOrdersRepository }
