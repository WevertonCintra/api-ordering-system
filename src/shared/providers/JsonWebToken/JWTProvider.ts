import { sign, verify } from 'jsonwebtoken'

import { IJWTProvider } from './IJWTProvider'

interface IPayload {
  sub: string
}

class JWTProvider implements IJWTProvider {
  public async signToken(secret: string, userId: string, expires: string): Promise<string> {
    return sign({}, secret, { subject: userId, expiresIn: expires })
  }

  public async verifyToken(token: string, secret: string): Promise<string> {
    const { sub } = verify(token, secret) as IPayload

    return sub
  }
}

export { JWTProvider }
