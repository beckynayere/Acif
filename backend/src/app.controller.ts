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
  @Get()
  async getHello(@Request() req): Promise<string> {
    const accessTokenPayload: AccessTokenPayload =
      req.user as AccessTokenPayload;
    return await this.appService.getHello(accessTokenPayload.userId);
  }