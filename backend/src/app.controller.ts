import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from './auth/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';
import { User as UserDecorator } from './auth/decorators/user.decorator';
import { AccessTokenPayload } from './auth/types/AccessTokenPayload';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@Public()
  @Get('public')
  getPublicHello(): string {
    return 'Hello this is a public route';
    
  }

  //@UseGuards(JwtGuard)
  @Get()
  // async getHello(@UserDecorator() user: AccessTokenPayload): Promise<string> {
  //   return await this.appService.getHello(String(user.sub));

    async getHello(@UserDecorator() user: AccessTokenPayload): Promise<string> {
      console.log('Extracted User:', user); // Debugging step
      
      if (!user || typeof user.sub !== 'string') {
        throw new Error('Invalid token payload: Missing or incorrect sub field');
      }
    
      return await this.appService.getHello(user.sub);
    }
    
    // return await this.appService.getHello(user.sub);
    // return await this.appService.getHello(user.userId);
  }

