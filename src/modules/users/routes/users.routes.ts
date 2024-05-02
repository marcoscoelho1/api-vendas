import { Router } from 'express';

import UserController from '../controllers/UsersController';
import multer from 'multer';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticaded from '@shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRoutes = Router();

const usersController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

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

usersRoutes.patch(
  '/avatar',
  isAuthenticaded,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRoutes;
