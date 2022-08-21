import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
export type AttendDocument = Attend & Document;

@Schema()
export class Attend {
  @Prop({ required: true })
  userId: Types.ObjectId;
  @Prop({ required: true })
  partyId: Types.ObjectId;
}

const AttendSchema = SchemaFactory.createForClass(Attend);
AttendSchema.index({ userId: 1, partyId: 1 }, { unique: true });
export { AttendSchema };
