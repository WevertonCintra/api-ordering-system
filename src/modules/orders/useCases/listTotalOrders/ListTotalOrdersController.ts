import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListTotalOrdersService } from './ListTotalOrdersService'

class ListTotalOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listTotalOrdersService = container.resolve(ListTotalOrdersService)

    const orders = await listTotalOrdersService.execute()

    return response.status(200).json(orders)
  }
}

export { ListTotalOrdersController }
