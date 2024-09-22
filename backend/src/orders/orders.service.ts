import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';
import { Product } from 'src/products/product.schema';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) { }

    async createOrder(createOrderDto: any): Promise<Order> {
        const createdOrder = new this.orderModel(createOrderDto);
        return createdOrder.save();
    }

    async getAllOrders(): Promise<Order[]> {
        return this.orderModel.find().populate('products.product').exec();
    }

    /**
     * Uppdate the status of order to Accepted and update orderd products quantity
     * @param id order Id
     * @returns 
     */
    async acceptOrder(id: string): Promise<any> {
        const acceptedOrder = await this.orderModel.findByIdAndUpdate(id, { status: 'Accepted' }, { new: true }).exec();

        // Update orderd products quantity
        if (acceptedOrder) {
            const products = acceptedOrder.products;
            for (let item of products) {
                await this.productModel.findOneAndUpdate(item.product, { $inc: { availableQuantity: item.orderedQuantity } }).exec();
            }
        }

        return acceptedOrder;
    }
}