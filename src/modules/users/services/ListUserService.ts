import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../infra/typeorm/repositories/UserRepository';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repository/IUserRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<IUser[]> {
    const users = await this.userRepository.find();

    return users;
  }
}

export default ListUserService;
