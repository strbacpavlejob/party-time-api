import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
export type PartyDocument = Party & Document;

@Schema({ timestamps: true })
export class Party {
  @Prop({ required: true })
  userId: Types.ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  latitude: number;
  @Prop({ required: true })
  longitude: number;
  @Prop({ required: true })
  startDateTime: Date;
  @Prop({ required: true })
  endDateTime: Date;
  @Prop({ required: true, default: 0 })
  ticketPrice: number;
  @Prop({ required: true })
  numberOfGuests: number;
  @Prop({ required: true })
  tags: Array<string>;
}
const PartySchema = SchemaFactory.createForClass(Party);
PartySchema.index({ userId: 1, title: 1 }, { unique: true });
export { PartySchema };
