import { Controller, Get, Param, Put, Delete, Query, Body, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(@Query('page') page = '1', @Query('limit') limit = '10') {
    return this.usersService.findAll(parseInt(page), parseInt(limit));
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
