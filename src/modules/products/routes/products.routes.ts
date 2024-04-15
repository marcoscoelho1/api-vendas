import { Router } from 'express';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get('/:id', productsController.showProduct);
productsRouter.post('/', productsController.createProduct);
productsRouter.put('/:id', productsController.updateProduct);
productsRouter.delete('/:id', productsController.deleteProduct);

export default productsRouter;
