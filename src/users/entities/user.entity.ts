import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { IUser } from '../interfaces/user.interface';

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks?: TaskEntity[];
}
