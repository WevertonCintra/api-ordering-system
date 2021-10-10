import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateClientService } from './UpdateClientService'

class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const { name, phone, local, another_city } = request.body

    const updateClientService = container.resolve(UpdateClientService)

    const client = await updateClientService.execute({ id, name, phone, local, another_city })

    return response.status(200).json(client)
  }
}

export { UpdateClientController }