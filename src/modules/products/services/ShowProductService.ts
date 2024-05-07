import AppError from '@shared/errors/AppError';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import { IShowProduct } from '../domain/models/IShowProduct';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProduct | undefined> {
    try {
      const product = await this.productRepository.findById(id);

      if (!product) {
        throw new AppError('Product not found.');
      }

      return product;
    } catch (e) {
      console.log(e);
    }
  }
}

export default ShowProductService;
