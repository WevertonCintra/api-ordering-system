import { IClientDTO } from '@modules/clients/dtos/IClientDTO'
import { Client } from '@shared/database/entities/Client'

interface IClientsRepository {
  create(data: IClientDTO): Promise<Client>
  findClientByName(name: string): Promise<Client>
  findClientById(id: string): Promise<Client>
  listClients(): Promise<Client[]>
  deleteClientById(id: string): Promise<void>
  save(client: Client): Promise<Client>
}

export { IClientsRepository }
