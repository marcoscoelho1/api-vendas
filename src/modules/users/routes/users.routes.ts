import { Router } from 'express';

import UserController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticaded from '@shared/http/middlewares/isAuthenticated';

const usersRoutes = Router();

const usersController = new UserController();

usersRoutes.get('/', isAuthenticaded, usersController.index);
usersRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRoutes;
