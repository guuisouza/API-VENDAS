import productsRouter from "@modules/products/routes/ProductsRoutes";
import usersRouter from "@modules/users/routes/UsersRoutes";
import sessionsRouter from "@modules/users/routes/SessionsRoutes";
import passwordRouter from "@modules/users/routes/PasswordRoutes";
import { Router } from "express";
import profileRouter from "@modules/users/routes/ProfileRoutes";
import customersRouter from "@modules/customers/routes/CustomersRoutes";
import ordersRouter from "@modules/orders/routes/OrdersRoutes";

const routes = Router()

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)
export default routes
