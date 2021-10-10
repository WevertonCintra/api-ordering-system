import { IClientDTO } from '@modules/clients/dtos/IClientDTO'
import { Client } from '@shared/database/entities/Client'

interface IClientsRepository {
  create(data: IClientDTO): Promise<Client>
  findByName(name: string): Promise<Client>
  findById(id: string): Promise<Client>
  list(): Promise<Client[]>
  deleteById(id: string): Promise<void>
  save(client: Client): Promise<Client>
}

export { IClientsRepository }
