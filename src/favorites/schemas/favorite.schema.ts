import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
export type FavoriteDocument = Favorite & Document;

@Schema()
export class Favorite {
  @Prop({ required: true})
  userId: Types.ObjectId;
  @Prop({ required: true})
  partyId: Types.ObjectId;
}

const FavoriteSchema = SchemaFactory.createForClass(Favorite);
FavoriteSchema.index({ userId: 1, partyId: 1 }, { unique: true });
export { FavoriteSchema };
