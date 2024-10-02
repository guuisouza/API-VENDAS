import { getCustomRepository } from "typeorm"
import Customer from "../typeorm/entities/Customer"
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository"

class ListCostumerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository)

    const customers = await customersRepository.find()

    return customers
  }
}

export default ListCostumerService
