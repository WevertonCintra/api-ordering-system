import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateDeliveryDateOrderService } from './UpdateDeliveryDateOrderService'

class UpdateDeliveryDateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const { delivery_date } = request.body

    const updateDeliveryDateOrderService = container.resolve(UpdateDeliveryDateOrderService)

    const order = await updateDeliveryDateOrderService.execute({ id, delivery_date })

    return response.status(200).json(order)
  }
}

export { UpdateDeliveryDateOrderController }