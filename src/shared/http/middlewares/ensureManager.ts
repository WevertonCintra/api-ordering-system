import { NextFunction, Request, Response } from 'express'

import { UsersRepository } from '@shared/database/repositories/UsersRepository'
import { AppError } from '@shared/errors/AppError'

export async function ensureUserManager(request: Request, response: Response, next: NextFunction) {
  const { id } = request.user

  const usersRepository = new UsersRepository()

  const user = await usersRepository.findById(id)

  if (!user.manager) {
    throw new AppError("User isn't manager!")
  }

  return next()
}