import AppError from '@shared/errors/AppError';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { injectable, inject } from 'tsyringe';
import { IRemoveProduct } from '../domain/models/IRemoveProduct';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRemoveProduct): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await this.productRepository.remove(product);
  }
}

export default DeleteProductService;
