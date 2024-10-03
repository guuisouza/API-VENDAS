import { getCustomRepository } from "typeorm"
import { CustomersRepository } from "../infra/typeorm/repositories/CustomersRepository"
import AppError from "@shared/errors/AppError"
import Customer from "../infra/typeorm/entities/Customer"

// essa interface irá tipar as informações que estamos recebendo
interface IRequest {
  name: string,
  email: string,
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> { // IRequest -> Tipagem dos parâmetros
    const customersRepository = getCustomRepository(CustomersRepository)

    const emailExists = await customersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError("Email address already used")
    }

    const customer = customersRepository.create({
      name,
      email
    })

    await customersRepository.save(customer)

    return customer
  }
}

export default CreateCustomerService
