import {
  Controller,
  Post,
  Body,
  Res,
  ForbiddenException,
} from '@nestjs/common';
import { NestResponse } from '../utils';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './decorators';

@Controller('/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async create(
    @Body() createAuthDto: CreateAuthDto,
    @Res() response: NestResponse,
  ) {
    try {
      const user = await this.authService.validateUser(createAuthDto);
      if (!user) {
        throw new Error();
      } else {
        const token = await this.authService.login(user);
        response.send(token);
      }
    } catch {
      throw new ForbiddenException();
    }
  }
}
