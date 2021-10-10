import { inject, injectable } from 'tsyringe'

import { IClientsRepository } from '@shared/database/repositories/IClientsRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
class DeleteClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const client = await this.clientsRepository.findById(id)

    if (!client) {
      throw new AppError('Client does not exists!')
    }

    await this.clientsRepository.deleteById(client.id)
  }
}

export { DeleteClientService }