import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateDateOrderService } from './UpdateDateOrderService'

class UpdateDateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const { delivery_date } = request.body

    const updateDateOrderService = container.resolve(UpdateDateOrderService)

    const order = await updateDateOrderService.execute({ id, delivery_date })

    return response.status(200).json(order)
  }
}

export { UpdateDateOrderController }