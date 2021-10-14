import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateStatusDeliveryOrderService } from './UpdateStatusDeliveryOrderService'

class UpdateStatusDeliveryOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const { status_delivery } = request.body

    const updateStatusDeliveryOrderService = container.resolve(UpdateStatusDeliveryOrderService)

    const order = await updateStatusDeliveryOrderService.execute({ id, status_delivery })

    return response.status(200).json(order)
  }
}

export { UpdateStatusDeliveryOrderController }