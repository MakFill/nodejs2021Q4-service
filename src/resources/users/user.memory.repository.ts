import { EntityRepository, Repository } from 'typeorm';
import { hashCreate } from '../../common/utils';
import { ILoginBody } from '../interfaces';
import { UserEntity } from './user.model';

@EntityRepository(UserEntity)
export class UserRepo extends Repository<UserEntity> {
  async getAll() {
    return this.createQueryBuilder().getMany();
  }

  async getOne(id: UserEntity['id']) {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async getUserByLogin(login: ILoginBody['login']) {
    return this.createQueryBuilder('user')
      .where('user.login = :login', { login })
      .getOne();
  }

  async add(user: Omit<UserEntity, 'id' | 'tasks'>) {
    const hashPassword = await hashCreate(user.password);
    const { identifiers } = await this.createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([{ ...user, password: hashPassword }])
      .execute();

    return this.getOne(identifiers[0]?.id);
  }

  async removeUser(id: UserEntity['id']) {
    return this.createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('id = :id', { id })
      .execute();
  }

  async updateUser(id: UserEntity['id'], user: Partial<UserEntity>) {
    await this.createQueryBuilder()
      .update(UserEntity)
      .set(user)
      .where('id = :id', { id })
      .execute();
    return this.getOne(id);
  }
}
