import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../infra/typeorm/repositories/UserRepository';
import AppError from '@shared/errors/AppError';
import { UserTokenRepository } from '../infra/typeorm/repositories/UserTokenRepository';

interface IRequest {
  email: string;
}

class SendForgotEmailPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await userTokensRepository.generate(user.id);

    console.log('token', token);
  }
}

export default SendForgotEmailPasswordService;
