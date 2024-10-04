import { getCustomRepository } from "typeorm"
import { CustomersRepository } from "../infra/typeorm/repositories/CustomersRepository"
import Customer from "../infra/typeorm/entities/Customer"
import AppError from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository"
import { IUpdateCustomer } from "../domain/models/IUpdateCustomer"

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customersRepository: ICustomersRepository
  ){}

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id)

    if (!customer) {
      throw new AppError("Customer not found")
    }

    const customerExists = await this.customersRepository.findByEmail(email)

   if (customerExists && email != customer.email) {
    throw new AppError("There is already one customer with this email.")
   }

    customer.name = name
    customer.email = email

    await this.customersRepository.save(customer)

    return customer
  }
}

export default UpdateCustomerService
