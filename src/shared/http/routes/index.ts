import productsRouter from "@modules/products/routes/ProductsRoutes";
import usersRouter from "@modules/users/routes/UsersRoutes";
import sessionsRouter from "@modules/users/routes/SessionsRoutes";
import { Router } from "express";

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes
