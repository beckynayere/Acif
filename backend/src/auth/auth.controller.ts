import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Register a new user (Public Endpoint)
   */
  //@Public()
  @Post('register')
  async register(@Body() registerDto: RegisterRequestDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Login user and receive JWT token (Public Endpoint)
   */
  //@Public()
  @Post('login')
  async login(@Body() loginDto: LoginRequestDto) {
    console.log({loginDto})
    return this.authService.login(loginDto);
  }

  /**
   * Public test route (No JWT required)
   */
  //@Public()
  @Get('public-route')
  getPublicData() {
    return { message: 'This is a public endpoint' };
  }

  /**
   * Protected route (JWT required)
   */
  //@UseGuards(JwtGuard)
  @Get('protected-route')
  getProtectedData() {
    return { message: 'This is a protected endpoint. JWT required.' };
  }
}
