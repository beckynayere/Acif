import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubmissionDocument = Submission & Document;

@Schema({ timestamps: true })
export class Submission {
  @Prop({ type: Types.ObjectId, ref: 'Campaign', required: true })
  campaign: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  influencer: Types.ObjectId;

  @Prop({ required: true })
  contentUrl: string; // URL to the social media post

  @Prop({ enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: string; // Submission status

  @Prop()
  engagement: number; // Estimated engagement (likes, shares, etc.)

  @Prop({ type: Date, default: Date.now })
  createdAt: Date; // Explicitly defining createdAt

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date; // Explicitly defining updatedAt
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
