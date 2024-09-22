import { Controller, Post, Get, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  /**
   * Route for creating new product
   * @param createProductDto
   */
  @Post()
  addProduct(@Body() createProductDto: any) {
    return this.productsService.addProduct(createProductDto);
  }

  /**
   * Route for getting all products
   * @param createProductDto
   */
  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }
}