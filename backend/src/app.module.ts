import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { User, UserSchema } from './users/schemas/user.schema';
import { Campaign, CampaignSchema } from './campaigns/schemas/campaign.schema';
import { Submission, SubmissionSchema } from './submissions/schemas/submission.schema';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }), // Load env config globally
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb+srv://rebeccanayere:Nayers@12@acif.qhwrw.mongodb.net/?retryWrites=true&w=majority&appName=Acif'), // Get from .env
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
