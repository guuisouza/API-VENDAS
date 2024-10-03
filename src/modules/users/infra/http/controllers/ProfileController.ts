import { Request, Response } from "express";
import UpdateProfileService from "../../../services/UpdateProfileService";
import ShowProfileService from "../../../services/ShowProfileService";
import { instanceToInstance } from 'class-transformer'

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfileService = new ShowProfileService()
    const user_id = req.user.id

    const user = await showProfileService.execute({ user_id })

    return res.json(instanceToInstance(user))
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {name, email, password, old_password} = req.body
    const user_id = req.user.id


    const updateProfile = new UpdateProfileService()

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password
    })

    return res.json(instanceToInstance(user))
  }
}
