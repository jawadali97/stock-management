import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MealsModule } from './meals/meals.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import configuration from 'environment/config';
import { MealsController } from './meals/meals.controller';
import { MealsService } from './meals/meals.service';
import { ProductSchema } from './products/product.schema';
import { MealSchema } from './meals/meal.schema';
import { OrderSchema } from './orders/order.schema';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';

@Module({
  imports: [
    // Connect to MongoDB
    MongooseModule.forRootAsync({
      useFactory: async (config) => ({
        uri: `${process.env.MONGO_DB_URL}`,
      })
    }),
    // Get env variables based on environment
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/environment/${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
      load: [configuration]
    }),
    MealsModule,
    ProductsModule,
    OrdersModule,
    MongooseModule.forFeature([{ name: 'Meal', schema: MealSchema }]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  controllers: [AppController, MealsController, ProductsController, OrdersController],
  providers: [AppService, MealsService, ProductsService, OrdersService],
})
export class AppModule { }
