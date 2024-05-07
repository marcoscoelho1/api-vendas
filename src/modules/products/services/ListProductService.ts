import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = productRepository.find();
    return products;
  }
}

export default ListProductService;
