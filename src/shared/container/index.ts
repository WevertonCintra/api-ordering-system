import { container } from 'tsyringe'

import { IHashProvider } from '@shared/providers/Bcrypt/IHashProvider'
import { HashProvider } from '@shared/providers/Bcrypt/HashProvider'
import { IJWTProvider } from '@shared/providers/JsonWebToken/IJWTProvider'
import { JWTProvider } from '@shared/providers/JsonWebToken/JWTProvider'
import { IUsersRepository } from '@shared/database/repositories/IUsersRepository'
import { UsersRepository } from '@shared/database/repositories/UsersRepository'
import { IOrdersRepository } from '@shared/database/repositories/IOrdersRepository'
import { OrdersRepository } from '@shared/database/repositories/OrdersRepository'
import { IClientsRepository } from '@shared/database/repositories/IClientsRepository'
import { ClientsRepository } from '@shared/database/repositories/ClientsRepository'

container.registerSingleton<IHashProvider>(
  'HashProvider',
  HashProvider
)

container.registerSingleton<IJWTProvider>(
  'JWTProvider',
  JWTProvider
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository', 
  UsersRepository
)

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository', 
  OrdersRepository
)

container.registerSingleton<IClientsRepository>(
  'ClientsRepository', 
  ClientsRepository
)