import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignService } from './campaigns.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Campaign } from './entities/campaign.entity';
import { CampaignSchema } from './schemas/campaign.schema';
// import { CampaignSchema, CampaignEntity } from './campaign.schema';


@Module({
  imports: [  MongooseModule.forFeature([{ name: Campaign.name, schema: CampaignSchema }])],
  controllers: [CampaignsController],
  providers: [CampaignService],

    
})
export class CampaignsModule {}
