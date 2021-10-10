import { inject, injectable } from 'tsyringe'

import { IClientsRepository } from '@shared/database/repositories/IClientsRepository'
import { Client } from '@shared/database/entities/Client'
import { AppError } from '@shared/errors/AppError'

@injectable()
class ShowClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string): Promise<Client> {
    const client = await this.clientsRepository.listByClientId(id)

    if (!client) {
      throw new AppError('Client does not exists!')
    }

    return client
  }
}

export { ShowClientService }