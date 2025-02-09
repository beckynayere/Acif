import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign } from './entities/campaign.entity';
import { CampaignDocument } from './schemas/campaign.schema';

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

  async update(id: string, updateData: Partial<Campaign>): Promise<CampaignDocument | null> {
    return this.campaignModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<CampaignDocument | null> {
    return this.campaignModel.findByIdAndDelete(id).exec();
  }
}
