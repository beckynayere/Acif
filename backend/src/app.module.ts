import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { User, UserSchema } from './users/schemas/user.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';                         
// import { Campaign, CampaignSchema } from './campaigns/schemas/campaign.schema';
// import { Submission, SubmissionSchema } from './submissions/schemas/submission.schema';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';
import config from './config';
import { AppController } from './app.controller';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }), // Load env config globally
    MongooseModule.forRootAsync({
      inject: [ConfigService],
   
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
    
        // Log on successful connection
        mongoose.connection.on('connected', () => {
          console.log('✅ Successfully connected to MongoDB');
        });
    
        mongoose.connection.on('error', (err) => {
          console.error('❌ MongoDB connection error:', err);
        });
  //
           return {
          uri,
   
          serverSelectionTimeoutMS: 10000, // Time to find a MongoDB server
          socketTimeoutMS: 45000, // Time to keep a connection open before closing
  
          
        };
      },
    }),
    UsersModule,
    CampaignsModule,
    SubmissionsModule,
    AuthModule,
  ],

  controllers: [ AppController],
    providers: [
      AppService,
    ],
  //   MongooseModule.forFeature([
  //     { name: User.name, schema: UserSchema },
  //     { name: Campaign.name, schema: CampaignSchema },
  //     { name: Submission.name, schema: SubmissionSchema },
  //   ]),
  // ],
})
export class AppModule {}
