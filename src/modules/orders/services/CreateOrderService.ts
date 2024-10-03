import { getCustomRepository } from "typeorm"
import AppError from "@shared/errors/AppError"
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository"
import Order from "../typeorm/entities/Order"
import { CustomersRepository } from "@modules/customers/typeorm/repositories/CustomersRepository"
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository"

interface IProduct {
  id: string,
  quantity: number
}

interface IRequest {
  customer_id: string,
  products: IProduct[]
}

class CreateOrderService {
  public async execute({customer_id, products}: IRequest): Promise<Order> {

    const ordersRepository = getCustomRepository(OrdersRepository)
    const customerRepository = getCustomRepository(CustomersRepository)
    const productRepository = getCustomRepository(ProductRepository)

    const customerExists = await customerRepository.findById(customer_id)

    if(!customerExists) {
      throw new AppError("Could not find any customer with the given id.")
    }

    const existsProducts = await productRepository.findAllByIds(products)

    if (!existsProducts.length) {
      throw new AppError("Could not find any products with the given ids.")
    }

    const existsProductsId = existsProducts.map((product) => product.id)

    // pega se tem algo enviado pelo usuario que não tem em existsProducts
    const checkInexistentsProducts = products.filter(
      product => !existsProductsId.includes(product.id)
    )

    if (checkInexistentsProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentsProducts[0].id}`)
    }

    const quantityAvailable = products.filter(
      product => existsProducts.filter(
        p => p.id === product.id
      )[0].quantity < product.quantity
    )

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
         is not availabe for ${quantityAvailable[0].id}.`
      )
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price
    }))

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity
    }))

    await productRepository.save(updatedProductQuantity)

    return order
  }

}

export default CreateOrderService
