import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign } from './entities/campaign.entity';
import { CampaignDocument } from './schemas/campaign.schema';
import { SubmissionDocument } from 'src/submissions/schemas/submission.schema';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  async create(data: Partial<Campaign>): Promise<CampaignDocument> {
    return new this.campaignModel(data).save();
  }

  async findAll(): Promise<CampaignDocument[]> {
    return this.campaignModel.find().exec();
  }

  async findOne(id: string): Promise<CampaignDocument> {
    const campaign = await this.campaignModel.findById(id).exec();
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
  }

  // async update(id: string, updateData: Partial<Campaign>): Promise<CampaignDocument | null> {
  //   return this.campaignModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  // }

  async update(id: string, updateData: Partial<Campaign>): Promise<CampaignDocument | null> {
    const updatedCampaign = await this.campaignModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedCampaign) throw new NotFoundException('Campaign not found');
    return updatedCampaign;
  }
  
  async findInfluencerCampaigns(influencerId: string): Promise<CampaignDocument[]> {
    return this.campaignModel.find({ influencers: influencerId }).exec();
  }
  
// submit ticket
async submitCampaignContent(influencerId: string, campaignId: string, contentUrl: string): Promise<SubmissionDocument> {
  const submission = new this.submissionModel({ influencer: influencerId, campaign: campaignId, contentUrl });
  return submission.save();
}

// check the submit details 
async getInfluencerPerformance(influencerId: string): Promise<any> {
  return this.submissionModel.aggregate([
    { $match: { influencer: influencerId } },
    { $group: { _id: "$influencer", totalPosts: { $sum: 1 }, dates: { $push: "$createdAt" } } }
  ]);
}

// Brands need to see a list of influencers per campaign
async getCampaignInfluencers(campaignId: string): Promise<any> {
  return this.submissionModel.find({ campaign: campaignId }).populate('influencer');
}

// Fetch Campaign Performance Metrics (GET request)

async getCampaignPerformance(campaignId: string): Promise<any> {
  return this.submissionModel.aggregate([
    { $match: { campaign: campaignId } },
    { $group: { _id: "$campaign", totalPosts: { $sum: 1 }, engagement: { $avg: "$engagement" } } }
  ]);
}

  async delete(id: string): Promise<CampaignDocument | null> {
    return this.campaignModel.findByIdAndDelete(id).exec();
  }
}
