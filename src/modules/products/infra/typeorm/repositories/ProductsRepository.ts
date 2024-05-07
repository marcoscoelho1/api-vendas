import { EntityRepository, Repository, getRepository } from 'typeorm';
import Product from '../entities/Product';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';

@EntityRepository(Product)
export class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<IProduct | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return product;
  }

  public async find(): Promise<IProduct[]> {
    const products = this.ormRepository.find();

    return products;
  }

  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<IProduct> {
    const product = await this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: IProduct): Promise<IProduct> {
    this.ormRepository.save(product);
    return product;
  }

  public async remove(product: IProduct): Promise<void> {
    this.ormRepository.remove(product);
  }
}
