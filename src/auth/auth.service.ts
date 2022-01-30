import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { hashCheck } from '../utils';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(createAuthDto: CreateAuthDto) {
    try {
      const user = await this.usersService.findByLogin(createAuthDto.login);
      if (!user) {
        throw new Error();
      }
      const { password: hashPassport } = user;
      const isPasswordRight = await hashCheck(
        createAuthDto.password,
        hashPassport,
      );
      if (isPasswordRight) {
        return user;
      }
      throw new Error();
    } catch {
      return null;
    }
  }

  async login(user: UserDto) {
    const { id, login } = user;
    const token = this.jwtService.sign({ id, login });
    return {
      token: token,
    };
  }
}
