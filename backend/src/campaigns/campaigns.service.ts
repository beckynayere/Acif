import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign, CampaignDocument } from './schemas/campaign.schema';
import { Submission, SubmissionDocument } from 'src/submissions/schemas/submission.schema';

@Injectable()
export class CampaignService {
  constructor(
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
    @InjectModel(Submission.name) private submissionModel: Model<SubmissionDocument>, // ✅ Inject Submission Model
  ) {}

  //  Create a new campaign
  async create(data: Partial<Campaign>): Promise<CampaignDocument> {
    return new this.campaignModel(data).save();
  }

  //  Find all campaigns
  async findAll(): Promise<CampaignDocument[]> {
    return this.campaignModel.find().exec();
  }

  //  Find a single campaign by ID
  async findOne(id: string): Promise<CampaignDocument> {
    const campaign = await this.campaignModel.findById(id).exec();
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
  }

  //  Update campaign details
  async update(id: string, updateData: Partial<Campaign>): Promise<CampaignDocument> {
    const updatedCampaign = await this.campaignModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedCampaign) throw new NotFoundException('Campaign not found');
    return updatedCampaign;
  }

  //  Find all campaigns an influencer is part of
  async findByInfluencer(influencerId: string): Promise<CampaignDocument[]> {
    return this.campaignModel.find({ influencers: influencerId }).exec();
  }

  // Influencer submits content for a campaign
  async submitContent(campaignId: string, userId: string, submissionLink: string): Promise<SubmissionDocument> {
    const submission = new this.submissionModel({
      influencer: userId,
      campaign: campaignId,
      contentUrl: submissionLink,
      engagement: 0, // Default engagement
    });
    return submission.save();
  }

  //  Approve or reject a submission
  async approveSubmission(campaignId: string, userId: string, status: 'approved' | 'rejected'): Promise<any> {
    const submission = await this.submissionModel.findOneAndUpdate(
      { campaign: campaignId, influencer: userId },
      { status },
      { new: true },
    );
    if (!submission) throw new NotFoundException('Submission not found');
    return submission;
  }

  //  Fetch performance metrics for an influencer
  async getInfluencerPerformance(userId: string): Promise<any> {
    return this.submissionModel.aggregate([
      { $match: { influencer: userId } },
      { $group: { _id: "$influencer", totalPosts: { $sum: 1 }, dates: { $push: "$createdAt" } } }
    ]);
  }

  //  Get a list of influencers for a specific campaign
  async getCampaignInfluencers(campaignId: string): Promise<any> {
    return this.submissionModel.find({ campaign: campaignId }).populate('influencer');
  }

  //  Fetch campaign performance metrics
  async getPerformanceMetrics(campaignId: string): Promise<any> {
    return this.submissionModel.aggregate([
      { $match: { campaign: campaignId } },
      { $group: { _id: "$campaign", totalPosts: { $sum: 1 }, engagement: { $avg: "$engagement" } } }
    ]);
  }

  //  Delete a campaign
  async delete(id: string): Promise<CampaignDocument | null> {
    return this.campaignModel.findByIdAndDelete(id).exec();
  }
}
