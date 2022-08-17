import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
export type PartyDocument = Party & Document;

@Schema()
export class Party {
  @Prop({ required: true, unique: true })
  userId: Types.ObjectId;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  latitude: number;
  @Prop({ required: true })
  longitude: number;
  @Prop({ required: true })
  date: Date;
  @Prop({ required: true })
  startTime: Date;
  @Prop({ required: true })
  endTime: Date;
  @Prop({ required: true })
  ticketPrice: number;
  @Prop({ required: true })
  maxPeople: number;
  @Prop({ required: true })
  tags: Array<string>;
  @Prop({ required: true })
  createdAt: Date;
}

export const PartySchema = SchemaFactory.createForClass(Party);
