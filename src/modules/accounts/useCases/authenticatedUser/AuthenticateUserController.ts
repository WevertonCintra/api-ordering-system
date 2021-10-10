import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { AuthenticateUserService } from './AuthenticateUserService'

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, password } = request.body

    const authenticateUserService = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUserService.execute({ name, password })

    return response.status(200).json({ user: classToClass(user), token })
  }
}

export { AuthenticateUserController }