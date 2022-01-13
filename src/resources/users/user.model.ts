import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUserResBody } from '../interfaces';

@Entity()
export class UserEntity implements IUserResBody {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;
}
