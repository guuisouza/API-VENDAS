import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../typeorm/repositories/UsersRepository"
import AppError from "@shared/errors/AppError"
import User from "../typeorm/entities/User"
import path from "path"
import uploadConfig from "@config/upload"
import fs from 'fs'

// essa interface irá tipar as informações que estamos recebendo
interface IRequest {
  user_id: string,
  avatarFileName: string
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IRequest ): Promise<User | undefined> { // IRequest -> Tipagem dos parâmetros
    const usersRepository = getCustomRepository(UsersRepository)

    const user = await usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found.')
    }


    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      // se o arquivo exist
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }

      user.avatar = avatarFileName

      await usersRepository.save(user)

      return user
    }
  }
}

export default UpdateUserAvatarService
