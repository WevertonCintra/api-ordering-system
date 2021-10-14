import { inject, injectable } from 'tsyringe'

import { IOrdersRepository } from '@shared/database/repositories/IOrdersRepository'

interface Total {
  totalStatus: number
  totalStatusDelivery: number
  totalStatusPaid: number
}

@injectable()
class ListTotalOrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute(): Promise<Total> {
    const totalStatus = await this.ordersRepository.countOrdersStatus()
    const totalStatusDelivery = await this.ordersRepository.countOrdersStatusDelivery()
    const totalStatusPaid = await this.ordersRepository.countOrdersStatusPaid()
    
    return { totalStatus, totalStatusDelivery, totalStatusPaid }
  }
}

export { ListTotalOrdersService }