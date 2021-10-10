import { inject, injectable } from 'tsyringe'

import { IUserDTO } from '@modules/accounts/dtos/IUserDTO'
import { User } from '@shared/database/entities/User'
import { IUsersRepository } from '@shared/database/repositories/IUsersRepository'
import { IHashProvider } from '@shared/providers/Bcrypt/IHashProvider'
import { IJWTProvider } from '@shared/providers/JsonWebToken/IJWTProvider'
import { AppError } from '@shared/errors/AppError'
import auth from '@shared/config/auth'

interface IResponse {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('JWTProvider')
    private jwtProvider: IJWTProvider
  ) {}

  async execute({ name, password }: IUserDTO): Promise<IResponse> {
    const user = await this.usersRepository.findByName(name)
    
    if (!user) {
      throw new AppError('Name or password incorrect!')
    }

    const passwordMatch = await this.hashProvider.compareHash(password, user.password)

    if(!passwordMatch) {
      throw new AppError('Name or password incorrect!')
    }

    const { secret, expiresIn } = auth.jwt

    const token = await this.jwtProvider.signToken(secret, user.id, expiresIn)

    return { user, token }
  }
}

export { AuthenticateUserService }
