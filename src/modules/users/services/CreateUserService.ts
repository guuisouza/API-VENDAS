import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../infra/typeorm/repositories/UsersRepository"
import AppError from "@shared/errors/AppError"
import User from "../infra/typeorm/entities/User"
import { hash } from "bcryptjs"

// essa interface irá tipar as informações que estamos recebendo
interface IRequest {
  name: string,
  email: string,
  password: string
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> { // IRequest -> Tipagem dos parâmetros
    const usersRepository = getCustomRepository(UsersRepository)

    const emailExists = await usersRepository.findByEmail(email)

    if (emailExists) {
      throw new AppError("Email address already used")
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
