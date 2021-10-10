import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListClientsService } from './ListClientsService'

class ListClientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listClientsService = container.resolve(ListClientsService)

    const clients = await listClientsService.execute()

    return response.status(200).json(clients)
  }
}

export { ListClientsController }
