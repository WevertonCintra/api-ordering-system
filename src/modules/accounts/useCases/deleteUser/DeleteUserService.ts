import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '@shared/database/repositories/IUsersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User does not exists!')
    }

    await this.usersRepository.deleteById(user.id)
  }
}

export { DeleteUserService }