import { Controller, Post, Get, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  addProduct(@Body() createProductDto: any) {
    return this.productsService.addProduct(createProductDto);
  }

  @Get()
  getAllProducts() {
    return this.productsService.getAllProducts();
  }
}