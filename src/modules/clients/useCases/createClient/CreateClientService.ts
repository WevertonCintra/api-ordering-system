import { inject, injectable } from 'tsyringe'

import { IClientsRepository } from '@shared/database/repositories/IClientsRepository'
import { IClientDTO } from '@modules/clients/dtos/IClientDTO'
import { Client } from '@shared/database/entities/Client'
import { AppError } from '@shared/errors/AppError'

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute({ name, city }: IClientDTO): Promise<Client> {
    const clientAlreadyExist = await this.clientsRepository.findClientByName(name)

    if (clientAlreadyExist) {
      throw new AppError('User already exists!')
    }

    const client = await this.clientsRepository.create({ name, city })

    return client
  }
}

export { CreateClientService }