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

    /**
     * Add new meal in DB
     * @param createMealDto Meal data object
     */
    async createMeal(createMealDto: any): Promise<Meal> {
        const createdMeal = new this.mealModel(createMealDto);
        return createdMeal.save();
    }

    /**
     * Deduct the products required to prepare a meal
     * @param id Meal Id
     * @returns 
     */
    async sellMeal(id: string): Promise<Meal> {
        // fetch meal match with ID
        const meal = await this.mealModel.findById(id).exec();
        if (meal) {
            const productsList = meal.products;
            for (let item of productsList) {
                const product = await this.productModel.findById(item.product).exec();
                const updatedQty = product.availableQuantity - item.quantity; // Deduct the quantity of products
                product.availableQuantity = updatedQty;
                await product.save();
            }
        }
        return meal;
    }

    async deleteMeal(id: string): Promise<any> {
        return this.mealModel.findByIdAndDelete(id).exec();
    }

    /**
     * Calculate the number of meals can be prepared and return all meals
     * @returns 
     */
    async getAllMeals(): Promise<Meal[]> {
        // Fetch all meals from DB
        const allMeals = await this.mealModel.find().populate('products.product').exec();
        const mealsResponse = [];
        for (let meal of allMeals) {
            const productsList = meal.products;
            let minQuantity = Infinity;

            // For all products in a meal calculate number of meals can be prepared
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
