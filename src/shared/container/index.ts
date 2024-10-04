import {container} from 'tsyringe'

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository'
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/CustomersRepository'

// mantém uma unica instancia de CustomersRepository
container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository
)
