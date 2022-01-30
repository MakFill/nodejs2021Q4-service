import { IsDefined } from 'class-validator';

export class CreateAuthDto {
  @IsDefined()
  login: string;

  @IsDefined()
  password: string;
}
