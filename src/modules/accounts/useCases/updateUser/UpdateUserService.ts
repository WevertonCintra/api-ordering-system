import { inject, injectable } from 'tsyringe'

import { IUserDTO } from '@modules/accounts/dtos/IUserDTO'
import { IUsersRepository } from '@shared/database/repositories/IUsersRepository'
import { User } from '@shared/database/entities/User'
import { IHashProvider } from '@shared/providers/Bcrypt/IHashProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({ id, name, password, manager }: IUserDTO): Promise<User> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User does not exist!')
    }

    const userWithUpdatedName = await this.usersRepository.findByName(name)

    if(userWithUpdatedName && userWithUpdatedName.id !== id) {
      throw new AppError('Name already in use')
    }

    user.name = name 
    user.password = await this.hashProvider.generateHash(password)
    user.manager = manager

    await this.usersRepository.save(user)

    return user
  }
}

export { UpdateUserService }