import { container } from 'tsyringe';

import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import { IUserRepository } from '@modules/users/domain/repository/IUserRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';

container.registerSingleton<IProductsRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UsersRepository);
