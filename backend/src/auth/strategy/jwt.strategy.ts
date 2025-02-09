// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';
// import { AccessTokenPayload } from '../types/AccessTokenPayload';
// import { User } from '../../users/schemas/user.schema';
// import { UsersService } from '../../users/users.service';
// // import { UserSchema } from 'src/users/schemas/user.schema/user.schema';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private readonly configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.get('JWT_SECRET'),
//     });
//   }

//   async validate(payload: AccessTokenPayload) {
//     return payload;
//   }
// }


import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    } as any);
  }

  /**
   * Validate the payload of the JWT to ensure it has the required fields
**/
  async validate(payload: any) {
    return payload
  }
}
