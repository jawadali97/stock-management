import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    /**
     * Add new product in DB
     * @param createProductDto // Data to be stored in DB
     * @returns 
     */
    async addProduct(createProductDto: any): Promise<Product> {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }

    async getAllProducts(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}