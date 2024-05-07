import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';

import { IUserCreate } from '../domain/models/IUserCreate';
import { IUserRepository } from '../domain/repository/IUserRepository';
import { IUser } from '../domain/models/IUser';
import { injectable, inject } from 'tsyringe';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: IUserCreate): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
