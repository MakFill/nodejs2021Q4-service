import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IBoardResBody } from '../interfaces';
import { TaskEntity } from '../tasks/task.model';
import { ColumnEntity } from './column.model';

@Entity()
export class BoardEntity implements IBoardResBody {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => ColumnEntity, (column) => column.board)
  columns!: ColumnEntity[];

  @OneToMany(() => TaskEntity, (task) => task.board)
  tasks!: TaskEntity[];
}
