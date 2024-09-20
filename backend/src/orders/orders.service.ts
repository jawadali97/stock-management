import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrdersService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) { }

    async createOrder(createOrderDto: any): Promise<Order> {
        const createdOrder = new this.orderModel(createOrderDto);
        return createdOrder.save();
    }

    async getAllOrders(): Promise<Order[]> {
        return this.orderModel.find().populate('products.product').exec();
    }

    async updateOrder(id: string, updateOrderDto: any): Promise<Order> {
        return this.orderModel.findByIdAndUpdate(id, updateOrderDto, { new: true }).exec();
    }
}