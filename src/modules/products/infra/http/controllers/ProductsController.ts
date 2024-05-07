import ShowProductService from '../../../services/ShowProductService';
import ListProductService from '../../../services/ListProductService';
import CreateProductService from '../../../services/CreateProductService';
import UpdateProductService from '../../../services/UpdateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import { Request, Response } from 'express';
import { ProductRepository } from '../../typeorm/repositories/ProductsRepository';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async showProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  public async createProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductRepository = new ProductRepository();

    const createProduct = new CreateProductService(createProductRepository);

    const product = await createProduct.execute({ name, price, quantity });

    return response.json(product);
  }

  public async updateProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return response.json(product);
  }

  public async deleteProduct(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
