import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { User, UserSchema } from './users/schemas/user.schema';
import { Campaign, CampaignSchema } from './campaigns/schemas/campaign.schema';
import { Submission, SubmissionSchema } from './submissions/schemas/submission.schema';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }), // Load env config globally
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'), // Get from .env
      }),
    }),
    UsersModule,
    CampaignsModule,
    SubmissionsModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: Submission.name, schema: SubmissionSchema },
    ]),
  ],
})
export class AppModule {}
