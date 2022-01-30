import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { IBoard } from '../interfaces/board.interface';
import { ColumnEntity } from './column.entity';

@Entity()
export class BoardEntity implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, { cascade: true })
  columns!: ColumnEntity[];

  @OneToMany(() => TaskEntity, (task) => task.board, { cascade: true })
  tasks?: TaskEntity[];
}
