import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // getHello(): string {
  //   return 'Welcome to the NestJS API!';
  // }
  getHello(userId: string): string {
    return `Hello, user with ID: ${userId}`;
  }
}
