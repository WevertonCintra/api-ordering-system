import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { UpdateUserService } from './UpdateUserService'

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const { name, password, manager } = request.body

    const updateUserService = container.resolve(UpdateUserService)

    const user = await updateUserService.execute({ id, name, password, manager })

    return response.status(200).json(classToClass(user))
  }
}

export { UpdateUserController }