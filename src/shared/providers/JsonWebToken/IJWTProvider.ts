import { JwtPayload } from 'jsonwebtoken'

interface IJWTProvider {
  signToken(secret: string, userId: string, expires: string): Promise<string>
  verifyToken(token: string, secret: string): Promise<string | JwtPayload>
}

export { IJWTProvider }
