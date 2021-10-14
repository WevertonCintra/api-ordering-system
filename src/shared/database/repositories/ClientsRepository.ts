import { getRepository, Repository } from 'typeorm'

import { IClientsRepository } from './IClientsRepository'
import { IClientDTO } from '@modules/clients/dtos/IClientDTO'
import { Client } from '@shared/database/entities/Client'

class ClientsRepository implements IClientsRepository {
  private repository: Repository<Client>

  constructor() {
    this.repository = getRepository(Client)
  }

  async create({ name, city }: IClientDTO): Promise<Client> {
    const createClient = this.repository.create({ name, city })

    const client = await this.repository.save(createClient)

    return client
  }

  async findClientByName(name: string): Promise<Client> {
    const client = await this.repository.findOne({ name })
  
    return client
  }

  async findClientById(id: string): Promise<Client> {
    const client = await this.repository.findOne(id)

    return client
  }

  async listClients(): Promise<Client[]> {
    const clients = await this.repository.find()

    return clients
  }

  async deleteClientById(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async save(client: Client): Promise<Client> {
    return this.repository.save(client)
  }
}

export { ClientsRepository }
