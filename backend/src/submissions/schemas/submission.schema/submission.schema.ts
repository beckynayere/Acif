// export class SubmissionSchema {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubmissionDocument = Submission & Document;

@Schema({ timestamps: true })
export class Submission {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  influencer: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Campaign' })
  campaign: Types.ObjectId;

  @Prop({ required: true })
  contentUrl: string; // e.g., a TikTok or Instagram post link

  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  status: string;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
// SubmissionSchema.index({ influencer: 1, campaign: 1 }, { unique: true });
