import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { ShowClientService } from './ShowClientService'

class ShowClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showClientService = container.resolve(ShowClientService)

    const client = await showClientService.execute(id)

    return response.json(classToClass(client))
  }
}

export { ShowClientController }