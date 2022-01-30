import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { getUserWithoutPassword, hashCreate } from '../utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await hashCreate(createUserDto.password);
    const { identifiers } = await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([{ ...createUserDto, password: hashPassword }])
      .execute();

    return this.findOne(identifiers[0]?.id);
  }

  async findAll() {
    const users = await this.usersRepository.createQueryBuilder().getMany();
    return users.map((item) => getUserWithoutPassword(item));
  }

  async findOne(id: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    if (user) {
      return getUserWithoutPassword(user);
    }

    return null;
  }

  async findByLogin(login: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.login = :login', { login })
      .getOne();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const hashPassword = await hashCreate(updateUserDto.password);
    await this.usersRepository
      .createQueryBuilder()
      .update(UserEntity)
      .set({ ...updateUserDto, password: hashPassword })
      .where('id = :id', { id })
      .execute();
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('id = :id', { id })
      .execute();
  }
}
