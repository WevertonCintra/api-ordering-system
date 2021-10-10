import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@shared/database/repositories/IUsersRepository'
import { User } from '@shared/database/entities/User'

@injectable()
class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.list()

    return users
  }
}

export { ListUsersService }