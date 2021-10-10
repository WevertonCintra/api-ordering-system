import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteOrderService } from './DeleteOrderService'

class DeleteOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteOrderService = container.resolve(DeleteOrderService)

    await deleteOrderService.execute(id)

    return response.status(200).send()
  }
}

export { DeleteOrderController }
