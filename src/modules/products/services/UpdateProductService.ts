import AppError from '@shared/errors/AppError';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    quantity,
    price,
  }: IUpdateProduct): Promise<IProduct | undefined> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await this.productRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
