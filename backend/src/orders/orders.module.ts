import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './order.schema';
import { ProductSchema } from '../products/product.schema';
import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';


@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Order',
        useFactory: async (connection: Connection) => { // Auto increment plugin configuration
          const schema = OrderSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(AutoIncrement, { inc_field: 'orderId' });
          return schema;
        },
        inject: [getConnectionToken()],
      },
    ]),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule { }
