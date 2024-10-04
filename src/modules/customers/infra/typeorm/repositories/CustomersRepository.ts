import { getRepository, Repository } from "typeorm";
import Customer from "../entities/Customer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";

export class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer> // o generics indica o que será manipulado
  constructor() {
    this.ormRepository = getRepository(Customer)
  }

  public async create({name, email}: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({
      name,
      email
    })

    await this.ormRepository.save(customer)

    return customer
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer)

    return customer
  }

  public async remove(customer: Customer): Promise<void> {
    await this.ormRepository.remove(customer)
  }

  public async findAll(): Promise<ICustomer[] | undefined> {
    const customers = await this.ormRepository.find()

    return customers
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      }
    })

    return customer
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      }
    })

    return customer
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      }
    })

    return customer
  }
}
