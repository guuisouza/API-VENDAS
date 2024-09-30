import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../typeorm/repositories/UsersRepository"
import AppError from "@shared/errors/AppError"
import User from "../typeorm/entities/User"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IRequest {
  email: string,
  password: string
}

interface IResponse {
  user: User,
  token: string
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401)
    }

    const passwordConfirmed = await compare(password, user.password)

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401)
    }

    const token = sign({}, 'fbe3f1d1a6bd7b382733b6817dece23e', {
      subject: user.id,
      expiresIn: '1d'
    })

    return {user, token}
  }
}

export default CreateSessionsService
