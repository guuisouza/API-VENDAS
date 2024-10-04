import Customer from "../infra/typeorm/entities/Customer"
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository"
import { inject, injectable } from "tsyringe"

@injectable()
class ListCostumerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ){}

  public async execute(): Promise<Customer[] | undefined> {

    const customers = await this.customersRepository.findAll()

    return customers
  }
}

export default ListCostumerService
