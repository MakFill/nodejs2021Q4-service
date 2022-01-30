import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BoardEntity } from '../../boards/entities/board.entity';
import { ColumnEntity } from '../../boards/entities/column.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ITask } from '../interfaces/task.interface';

@Entity()
export class TaskEntity implements ITask {
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

  @ManyToOne(() => BoardEntity, (board) => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId', referencedColumnName: 'id' })
  board!: BoardEntity;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'columnId', referencedColumnName: 'id' })
  column!: ColumnEntity;
}
