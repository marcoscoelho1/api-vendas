import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  findById(id: string): Promise<IProduct | undefined>;
  find(): Promise<IProduct[]>;
  remove(product: IProduct): Promise<void>;
}
