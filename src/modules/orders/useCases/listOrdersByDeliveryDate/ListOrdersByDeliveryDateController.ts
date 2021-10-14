import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListOrdersByDeliveryDateService } from './ListOrdersByDeliveryDateService'

class ListOrdersByDeliveryDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOrdersByDeliveryDateService = container.resolve(ListOrdersByDeliveryDateService)

    const orders = await listOrdersByDeliveryDateService.execute()

    return response.status(200).json(orders)
  }
}

export { ListOrdersByDeliveryDateController }
