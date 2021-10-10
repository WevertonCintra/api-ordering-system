import { inject, injectable } from 'tsyringe'

import { IClientsRepository } from '@shared/database/repositories/IClientsRepository'
import { Client } from '@shared/database/entities/Client'

@injectable()
class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(): Promise<Client[]> {
    const clients = await this.clientsRepository.list()

    return clients
  }
}

export { ListClientsService }