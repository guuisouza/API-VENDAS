import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../typeorm/repositories/UsersRepository"
import AppError from "@shared/errors/AppError"
import User from "../typeorm/entities/User"
import { compare } from "bcryptjs"

interface IRequest {
  email: string,
  password: string
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> { // IRequest -> Tipagem dos parâmetros
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401)
    }

    const passwordConfirmed = await compare(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401)
    }

    await usersRepository.save(user)

    return user
  }
}

export default CreateSessionsService
