import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository"
import AppError from "@shared/errors/AppError"
import Product from "../infra/typeorm/entities/Product"

// essa interface irá tipar as informações que estamos recebendo
interface IRequest {
  name: string,
  price: number,
  quantity: number
}

class CreateProductService {
  public async execute({name, price, quantity}: IRequest): Promise<Product> { // IRequest -> Tipagem dos parâmetros
    // método customizado então usa o método getCustomRepository
    const productsRepository = getCustomRepository(ProductRepository)
    // verifica se o produto existe com o mesmo nome, através do repositório de
    // product que tem esse método customizado e mais os do TypeORM
    const productExists = await productsRepository.findByName(name)

    if(productExists) {
      throw new AppError("There is already one product with this name")
    }

    // cria então uma instancia do produto com os
    const product = productsRepository.create({
      name,
      price,
      quantity
    })

    await productsRepository.save(product)

    return product
  }
}

export default CreateProductService
