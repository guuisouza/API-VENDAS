import productsRouter from "@modules/products/routes/ProductsRoutes";
import { Router } from "express";

const routes = Router()

routes.use('/products', productsRouter)

export default routes
