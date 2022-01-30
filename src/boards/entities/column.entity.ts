import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { IColumn } from '../interfaces/column.interface';
import { BoardEntity } from './board.entity';

@Entity()
export class ColumnEntity implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => BoardEntity, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  board?: BoardEntity;

  @OneToMany(() => TaskEntity, (task) => task.column)
  tasks?: TaskEntity[];
}
