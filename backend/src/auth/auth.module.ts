// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UsersModule } from '../users/users.module';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { JwtStrategy } from './strategies/jwt.strategy';

// @Module({
//     imports: [
//       UsersModule,
//       PassportModule,
//       JwtModule.register({
//         secret: process.env.JWT_SECRET || 'your_secret_key', // Use env for security
//         signOptions: { expiresIn: '1h' },
//       }),
//     ],
//     providers: [AuthService, JwtStrategy],
//     controllers: [AuthController],
//     exports: [AuthService],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';  
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: 3600 },
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [AuthService, LocalStrategy,  UsersService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
