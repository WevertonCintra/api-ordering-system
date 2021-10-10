import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteClientService } from './DeleteClientService'

class DeleteClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteClientService = container.resolve(DeleteClientService)

    await deleteClientService.execute(id)

    return response.status(200).send()
  }
}

export { DeleteClientController }