import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NestResponse } from '../utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException({ message: `User ${userId} not found` });
    } else {
      return user;
    }
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.update(userId, updateUserDto);
    if (!user) {
      throw new NotFoundException({ message: `User ${userId} not found` });
    } else {
      return user;
    }
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string, @Res() response: NestResponse) {
    const user = await this.usersService.remove(userId);
    if (user.affected) {
      response.status(HttpStatus.NO_CONTENT).send();
    } else {
      throw new NotFoundException({ message: `User ${userId} not found` });
    }
  }
}
