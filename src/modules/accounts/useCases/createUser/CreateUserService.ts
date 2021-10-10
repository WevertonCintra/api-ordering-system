import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@shared/database/repositories/IUsersRepository'
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO'
import { User } from '@shared/database/entities/User'
import { IHashProvider } from '@shared/providers/Bcrypt/IHashProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({ name, password }: IUserDTO): Promise<User> {
    const userAlreadyExist = await this.usersRepository.findByName(name)

    if (userAlreadyExist) {
      throw new AppError('User already exists!')
    }

    const passwordHash = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({ 
      name,
      password: passwordHash
    })

    return user
  }
}

export { CreateUserService }
