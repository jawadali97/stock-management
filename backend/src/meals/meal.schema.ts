import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Meal extends Document {
    @Prop({ required: true })
    name: string;

    @Prop([{ product: { type: Types.ObjectId, ref: 'Product' }, quantity: Number }])
    products: { product: Types.ObjectId, quantity: number }[];

    @Prop()
    quantity: number;
}

export const MealSchema = SchemaFactory.createForClass(Meal);