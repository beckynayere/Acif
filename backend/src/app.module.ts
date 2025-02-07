import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';
// import { SubmissionsModule } from './submissions/submissions.module';
import { BrandsModule } from './brands/brands.module';
import { SubmissionsModule } from './submissions/submissions.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config] }), // Load config
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb+srv://rebeccanayere:Nayers@12@acif.qhwrw.mongodb.net/?retryWrites=true&w=majority&appName=Acif'),
      }),
    }), UsersModule, CampaignsModule, BrandsModule, SubmissionsModule
    ,
  ],
})
export class AppModule {}
