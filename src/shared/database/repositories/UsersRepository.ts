import { getRepository, Repository } from 'typeorm'

import { IUsersRepository } from './IUsersRepository'
import { IUserDTO } from '@modules/accounts/dtos/IUserDTO'
import { User } from '@shared/database/entities/User'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({ name, password }: IUserDTO): Promise<User> {
    const createUser = this.repository.create({ name, password })

    const user = await this.repository.save(createUser)

    return user
  }

  async findByName(name: string): Promise<User> {
    const collaboratorEmail = await this.repository.findOne({ name })

    return collaboratorEmail
  }

  async findById(id: string): Promise<User> {
    const collaboratorId = await this.repository.findOne(id)

    return collaboratorId
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find()

    return users
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user)
  }
}

export { UsersRepository }
