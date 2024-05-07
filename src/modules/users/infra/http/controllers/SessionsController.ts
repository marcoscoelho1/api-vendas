import { Request, Response } from 'express';
import CreateSessionsService from '@modules/users/services/CreateSessionsService';
import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionsService);

    const user = await createSession.execute({ email, password });

    return response.json(user);
  }
}
