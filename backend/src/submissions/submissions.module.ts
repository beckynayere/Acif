import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Submission, SubmissionSchema } from './schemas/submission.schema';
// import { SubmissionsController } from './submissions.controller';
// import { SubmissionsService } from './submissions.service';
import { Campaign, CampaignSchema } from 'src/campaigns/schemas/campaign.schema';
import { SubmissionController } from './submissions.controller';
import { SubmissionService } from './submissions.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Submission.name, schema: SubmissionSchema },
       { name: Campaign.name, schema: CampaignSchema }

    ]),
  ],
  controllers: [SubmissionController ],
  providers: [SubmissionService],
  exports: [MongooseModule], 
})
export class SubmissionsModule {}
