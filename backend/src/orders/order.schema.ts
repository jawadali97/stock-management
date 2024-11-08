import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Order extends Document {
    @Prop()
    orderId: number; // Auto incremental ID value

    @Prop({ default: Date.now })
    date: Date;

    @Prop({ default: 'Sent', enum: ['Sent', 'Accepted'] })
    status: string;

    @Prop([{ product: { type: Types.ObjectId, ref: 'Product' }, orderedQuantity: Number }])
    products: { product: Types.ObjectId, orderedQuantity: number }[]; // Id of the product associated with Products collection
}

export const OrderSchema = SchemaFactory.createForClass(Order);
