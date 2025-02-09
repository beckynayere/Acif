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

  @Prop({ type: [{ type: String }] }) 
  submissions: string[]; // Links to influencer posts

  @Prop({ default: 'ongoing' }) 
  status: string; // "ongoing", "completed"

  @Prop({ default: 0 }) 
  totalPosts: number; // Total posts submitted

  @Prop({ default: 0 }) 
  engagement: number; // Estimated engagement (likes, shares, etc.)

  @Prop({ default: 0 }) 
  earnings: number; // Estimated earnings

  @Prop({ type: Map, of: String }) 
  approvalStatus: Map<string, string>; // Influencer ID -> "approved" | "rejected"
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
CampaignSchema.index({ title: 1 }, { unique: true });
