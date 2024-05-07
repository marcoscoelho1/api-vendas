import AppError from '@shared/errors/AppError';
import { IProduct } from '../domain/models/IProduct';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

class CreateProductService {
  constructor(private productRepository: IProductsRepository) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = await this.productRepository.create({
      name,
      price,
      quantity,
    });
    await this.productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
