import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { AccessToken } from './types/AccessTokenPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates user credentials by checking email and password.
   */
  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  /**
   * Generates an access token for an authenticated user.
   */
  private generateToken(user: UserDocument): AccessToken {
    const payload = { email: user.email, sub: String(user._id), role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  // private generateToken(user: UserDocument): AccessToken {
  //   const payload: AccessTokenPayload = {
  //     email: user.email,
  //     sub: user._id.toString(),  // 👈 Ensure `sub` is always a string
  //     role: user.role,
  //   };
  
  //   return { access_token: this.jwtService.sign(payload) };
  // }
  /**
   * Handles user login by validating credentials and returning a JWT.
   */
  async login(loginDto: LoginRequestDto): Promise<AccessToken> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    return this.generateToken(user);
  }

  /**
   * Handles new user registration, including password hashing and JWT generation.
   */
  async register(registerDto: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findOneByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return this.generateToken(newUser);
  }
}

