import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { ListUsersService } from './ListUsersService'

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService)

    const users = await listUsersService.execute()

    return response.status(200).json(classToClass(users))
  }
}

export { ListUsersController }
