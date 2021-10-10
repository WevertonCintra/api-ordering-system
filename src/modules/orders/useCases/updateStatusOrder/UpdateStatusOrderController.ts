import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateStatusOrderService } from './UpdateStatusOrderService'

class UpdateStatusOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const { status } = request.body

    const updateStatusOrderService = container.resolve(UpdateStatusOrderService)

    const order = await updateStatusOrderService.execute({ id, status })

    return response.status(200).json(order)
  }
}

export { UpdateStatusOrderController }