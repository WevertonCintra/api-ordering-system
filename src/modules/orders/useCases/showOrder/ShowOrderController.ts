import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { ShowOrderService } from './ShowOrderService'

class ShowOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showOrderService = container.resolve(ShowOrderService)

    const order = await showOrderService.execute(id)

    return response.json(classToClass(order))
  }
}

export { ShowOrderController }