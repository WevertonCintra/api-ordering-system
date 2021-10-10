import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateOrderService } from './CreateOrderService'

class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { client_id, delivery_date } = request.body

    const createOrderService = container.resolve(CreateOrderService)

    const order = await createOrderService.execute({ client_id, delivery_date })

    return response.status(201).json(order)
  }
}

export { CreateOrderController }
