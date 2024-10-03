import productsRouter from "@modules/products/infra/http/routes/ProductsRoutes";
import usersRouter from "@modules/users/infra/http/routes/UsersRoutes";
import sessionsRouter from "@modules/users/infra/http/routes/SessionsRoutes";
import passwordRouter from "@modules/users/infra/http/routes/PasswordRoutes";
import { Router } from "express";
import profileRouter from "@modules/users/infra/http/routes/ProfileRoutes";
import customersRouter from "@modules/customers/infra/http/routes/CustomersRoutes";
import ordersRouter from "@modules/orders/infra/http/routes/OrdersRoutes";

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)
export default routes
