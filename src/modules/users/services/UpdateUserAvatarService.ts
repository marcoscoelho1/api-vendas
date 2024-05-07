import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../infra/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import { IUserRepository } from '../domain/repository/IUserRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository') private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IUpdateAvatar) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }

      user.avatar = avatarFileName;

      await this.usersRepository.save(user);
    }
  }
}

export default UpdateUserAvatarService;
