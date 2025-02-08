import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()  // 👈 This route is PUBLIC (No JWT needed)
  @Get('public-route')
  getPublicData() {
    return { message: 'This is a public endpoint' };
  }

  @UseGuards(JwtGuard) // 👈 This route requires a JWT
  @Get('protected-route')
  getProtectedData() {
    return { message: 'This is a protected endpoint' };
  }
}
