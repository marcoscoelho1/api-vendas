import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<IProduct[]> {
    const products = this.productRepository.find();
    return products;
  }
}

export default ListProductService;
