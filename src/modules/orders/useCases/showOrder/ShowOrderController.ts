import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ShowOrderService } from './ShowOrderService'

class ShowOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showOrderService = container.resolve(ShowOrderService)

    const order = await showOrderService.execute(id)

    return response.status(200).json(order)
  }
}

export { ShowOrderController }