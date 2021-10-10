import { IUserDTO } from '@modules/accounts/dtos/IUserDTO'
import { User } from '@shared/database/entities/User'

interface IUsersRepository {
  create(data: IUserDTO): Promise<User>
  findByName(name: string): Promise<User>
  findById(id: string): Promise<User>
  list(): Promise<User[]>
  deleteById(id: string): Promise<void>
  save(user: User): Promise<User>
}

export { IUsersRepository }
