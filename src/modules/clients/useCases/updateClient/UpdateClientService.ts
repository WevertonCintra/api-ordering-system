import { inject, injectable } from 'tsyringe'

import { IClientDTO } from '@modules/clients/dtos/IClientDTO'
import { IClientsRepository } from '@shared/database/repositories/IClientsRepository'
import { Client } from '@shared/database/entities/Client'
import { AppError } from '@shared/errors/AppError'

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute({ id, name, phone, city }: IClientDTO): Promise<Client> {
    const client = await this.clientsRepository.findById(id)

    if (!client) {
      throw new AppError('Client does not exist!')
    }

    const clientWithUpdatedName = await this.clientsRepository.findByName(name)

    if(clientWithUpdatedName && clientWithUpdatedName.id !== id) {
      throw new AppError('Name already in use')
    }

    client.name = name 
    client.phone = phone
    client.city = city

    await this.clientsRepository.save(client)

    return client
  }
}

export { UpdateClientService }