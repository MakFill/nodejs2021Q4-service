import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskEntity } from '..';
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

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks!: TaskEntity[];
}
