import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterRequestDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  role: 'influencer' | 'brand';
}
