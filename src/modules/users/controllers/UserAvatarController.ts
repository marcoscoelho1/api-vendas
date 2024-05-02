import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file?.filename || '',
    });

    return response.json(user);
  }
}
