import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateClientService } from './CreateClientService'

class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, city } = request.body

    const createClientService = container.resolve(CreateClientService)

    const client = await createClientService.execute({ name, city })

    return response.status(201).json(client)
  }
}

export { CreateClientController }
