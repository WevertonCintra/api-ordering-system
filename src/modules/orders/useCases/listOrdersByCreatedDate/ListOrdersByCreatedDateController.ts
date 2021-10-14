import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListOrdersByCreatedDateService } from './ListOrdersByCreatedDateService'

class ListOrdersByCreatedDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOrdersByCreatedDateService = container.resolve(ListOrdersByCreatedDateService)

    const orders = await listOrdersByCreatedDateService.execute()

    return response.status(200).json(orders)
  }
}

export { ListOrdersByCreatedDateController }
