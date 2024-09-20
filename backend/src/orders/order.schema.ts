import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Order extends Document {
    @Prop({ required: true })
    orderId: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    status: string;

    @Prop([{ product: { type: Types.ObjectId, ref: 'Product' }, orderedQuantity: Number }])
    products: { product: Types.ObjectId, orderedQuantity: number }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);