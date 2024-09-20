import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    availableQuantity: number;

    @Prop({ default: 'kg', enum: ['kg', 'pcs'] })
    unit: string; // kg | pcs
}

export const ProductSchema = SchemaFactory.createForClass(Product);