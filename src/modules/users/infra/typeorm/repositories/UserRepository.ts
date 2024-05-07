import { Repository, getRepository } from 'typeorm';
import User from '../entities/User';
import { IUserRepository } from '@modules/users/domain/repository/IUserRepository';
import { IUserCreate } from '@modules/users/domain/models/IUserCreate';
import { IUser } from '@modules/users/domain/models/IUser';

export class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByName(name: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: { name },
    });

    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({ name, email, password }: IUserCreate): Promise<IUser> {
    const user = await this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    await this.ormRepository.save(user);
    return user;
  }

  public async find(): Promise<IUser[]> {
    const users = await this.ormRepository.find();

    return users;
  }
}
