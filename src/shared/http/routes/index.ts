import productsRouter from "@modules/products/routes/ProductsRoutes";
import usersRouter from "@modules/users/routes/UsersRoutes";
import { Router } from "express";

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)

export default routes
