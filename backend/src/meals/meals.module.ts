import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MealSchema } from './meal.schema';
import { ProductSchema } from '../products/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule { }
