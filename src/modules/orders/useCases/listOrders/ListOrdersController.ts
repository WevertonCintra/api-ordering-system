import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListOrdersService } from './ListOrdersService'

class ListOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOrdersService = container.resolve(ListOrdersService)

    const orders = await listOrdersService.execute()

    return response.status(200).json(orders)
  }
}

export { ListOrdersController }
