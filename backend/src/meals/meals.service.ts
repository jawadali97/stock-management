import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal } from './meal.schema';
import { Product } from '../products/product.schema';

@Injectable()
export class MealsService {
    constructor(
        @InjectModel(Meal.name) private mealModel: Model<Meal>,
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) { }

    async createMeal(createMealDto: any): Promise<Meal> {
        // const productsList = createMealDto.products;
        // let minQuantity = Infinity;

        // for (let item of productsList) {
        //     const product = await this.productModel.findById(item.product).exec();
        //     const possibleQuantity = product.availableQuantity / item.quantity;
        //     minQuantity = Math.min(minQuantity, possibleQuantity);
        // }

        // createMealDto.quantity = Math.floor(minQuantity);
        const createdMeal = new this.mealModel(createMealDto);
        return createdMeal.save();
    }

    async sellMeal(id: string): Promise<Meal> {
        const meal = await this.mealModel.findById(id).exec();
        if (meal) {
            const productsList = meal.products;
            for (let item of productsList) {
                const product = await this.productModel.findById(item.product).exec();
                const updatedQty = product.availableQuantity - item.quantity;
                product.availableQuantity = updatedQty;
                await product.save();
            }
        }

        // const allMeals = await this.mealModel.find().exec();
        // for (let meal of allMeals) {
        //     const productsList = meal.products;
        //     let minQuantity = Infinity;

        //     for (let item of productsList) {
        //         const product = await this.productModel.findById(item.product).exec();
        //         const possibleQuantity = product.availableQuantity / item.quantity;
        //         minQuantity = Math.min(minQuantity, possibleQuantity);
        //     }

        //     meal.quantity = Math.floor(minQuantity);
        //     await meal.save();
        // }
        // return this.mealModel.find().populate('products.product').exec();

        return meal;
    }

    async deleteMeal(id: string): Promise<any> {
        return this.mealModel.findByIdAndDelete(id).exec();
    }

    async getAllMeals(): Promise<Meal[]> {
        const allMeals = await this.mealModel.find().populate('products.product').exec();
        const mealsResponse = [];
        for (let meal of allMeals) {
            const productsList = meal.products;
            let minQuantity = Infinity;

            for (let item of productsList) {
                const product = await this.productModel.findById(item.product).exec();
                const possibleQuantity = (product.availableQuantity / item.quantity) || 0;
                minQuantity = Math.min(minQuantity, possibleQuantity);
            }
            meal.quantity = Math.floor(minQuantity);
            mealsResponse.push(meal);
        }
        return mealsResponse;
    }
}
