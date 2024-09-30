import { Router } from "express";
import UsersController from "../controllers/UsersController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "../middlewares/isAuthenticated";

const usersRouter = Router()
const userController = new UsersController()

usersRouter.get('/', isAuthenticated, userController.index)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  userController.create
)

export default usersRouter
