import bcrypt from 'bcrypt';
import { ILoginBody } from '../../resources/interfaces';

const saltRounds = 10;

export const hashCreate = async (password: ILoginBody['password']) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const hashCheck = async (
  password: ILoginBody['password'],
  hash: string
) => bcrypt.compare(password, hash);
