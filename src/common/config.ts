import dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const { NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY } =
  process.env;
export const PORT = parseInt(<string>process.env.PORT, 10);
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
