import { IUser } from '../models/IUser';
import { IUserCreate } from '../models/IUserCreate';

export interface IUserRepository {
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: IUserCreate): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  find(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | undefined>;
}
