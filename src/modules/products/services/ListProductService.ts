import { getCustomRepository } from "typeorm"
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository"
import Product from "../infra/typeorm/entities/Product"

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository)

    const products = await productsRepository.find()

    return products
  }
}

export default ListProductService
