import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Submission, SubmissionDocument } from './submission.schema';
import { Campaign, CampaignDocument } from 'src/campaigns/schemas/campaign.schema';
import { Submission, SubmissionDocument } from './schemas/submission.schema';
// import { Campaign, CampaignDocument } from '../campaigns/campaign.schema';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<SubmissionDocument>,
    @InjectModel(Campaign.name) private campaignModel: Model<CampaignDocument>,
  ) {}

  //  Fetch campaigns an influencer has joined
  async findCampaignsByInfluencer(influencerId: string): Promise<CampaignDocument[]> {
    return this.campaignModel.find({ influencers: influencerId }).exec();
  }

  //  Submit campaign content
  async createSubmission(data: Partial<Submission>): Promise<SubmissionDocument> {
    return new this.submissionModel(data).save();
  }

  // Fetch influencer performance metrics
  async getPerformanceMetrics(influencerId: string) {
    const submissions = await this.submissionModel.find({ influencer: influencerId }).exec();
    
    return {
      totalSubmissions: submissions.length,
      submissionDates: submissions.map(sub => sub.createdAt),
      estimatedEngagement: submissions.length * 10, // Example engagement estimate logic
    };
  }

  //  Fetch campaign submissions for brand approval
  async getSubmissionsForCampaign(campaignId: string) {
    return this.submissionModel.find({ campaign: campaignId }).populate('influencer').exec();
  }

  //  Approve or reject influencer submissions
  async updateSubmissionStatus(submissionId: string, status: 'approved' | 'rejected') {
    return this.submissionModel.findByIdAndUpdate(submissionId, { status }, { new: true }).exec();
  }
}
