import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  createOrder(@Body() createOrderDto: any) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Put(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: any) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }
}