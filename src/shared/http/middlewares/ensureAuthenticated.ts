import { NextFunction, Request, Response } from 'express'

import { JWTProvider } from '@shared/providers/JsonWebToken/JWTProvider'
import { AppError } from '@shared/errors/AppError'
import auth from '@shared/config/auth'

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction): Promise<void> {
  const authToken = request.headers.authorization

  if (!authToken) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authToken.split(' ')

  try {
    const jsonWebtoken = new JWTProvider()

    const userId = await jsonWebtoken.verifyToken(token, auth.jwt.secret)

    request.user = {
      id: userId
    }

    return next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}