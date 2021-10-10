import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { CreateUserService } from './CreateUserService'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password } = request.body

    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute({ name, password })

    return response.status(201).json(classToClass(user))
  }
}

export { CreateUserController }
