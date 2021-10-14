import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateStatusPaidOrderService } from './UpdateStatusPaidOrderService'

class UpdateStatusPaidOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const { status_paid } = request.body

    const updateStatusPaidOrderService = container.resolve(UpdateStatusPaidOrderService)

    const order = await updateStatusPaidOrderService.execute({ id, status_paid })

    return response.status(200).json(order)
  }
}

export { UpdateStatusPaidOrderController }