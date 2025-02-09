import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CampaignDocument = Campaign & Document;

@Schema({ timestamps: true })
export class Campaign {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  deadline: Date;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  influencers: Types.ObjectId[];
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
CampaignSchema.index({ title: 1 }, { unique: true });
