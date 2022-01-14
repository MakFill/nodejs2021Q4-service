import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../users/user.model';
import { ITaskResBody } from '../interfaces';

@Entity()
export class TaskEntity implements ITaskResBody {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column('varchar', { nullable: true })
  userId!: string | null;

  @Column()
  boardId!: string;

  @Column('varchar', { nullable: true })
  columnId!: string | null;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user!: UserEntity;
}
