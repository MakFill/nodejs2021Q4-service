import jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import { hashCheck } from '../utils';
import { UserEntity } from '../../resources';
import { ILoginBody } from '../../resources/interfaces';
import { UserRepo } from '../../resources/users/user.memory.repository';
import { JWT_SECRET_KEY } from '../config';

export const getSignToken = async (
  userLogin: ILoginBody['login'],
  password: ILoginBody['password']
) => {
  const usersRepo = getConnection().getCustomRepository(UserRepo);
  try {
    const user: UserEntity | undefined = await usersRepo.getUserByLogin(
      userLogin
    );
    if (!user) {
      throw new Error();
    }
    const { password: hashPassport } = user;
    const isPasswordRight = await hashCheck(password, hashPassport);
    if (isPasswordRight) {
      const { id, login } = user;
      const token = jwt.sign({ id, login }, JWT_SECRET_KEY as string, {
        expiresIn: '10m',
      });
      return token;
    }
    throw new Error();
  } catch {
    return null;
  }
};
