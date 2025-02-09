import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignService } from './campaigns.service';
import { MongooseModule } from '@nestjs/mongoose';

import { Campaign, CampaignSchema } from './schemas/campaign.schema';
import {  Submission, SubmissionSchema } from 'src/submissions/schemas/submission.schema';

// import { CampaignSchema, CampaignEntity } from './campaign.schema';


@Module({
  imports: [  MongooseModule.forFeature([{ name: Campaign.name, schema: CampaignSchema },
    { name: Submission.name, schema: SubmissionSchema }])],
  controllers: [CampaignsController],
  providers: [CampaignService],

    
})
export class CampaignsModule {}
