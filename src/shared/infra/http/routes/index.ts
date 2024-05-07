import { Router } from 'express';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
