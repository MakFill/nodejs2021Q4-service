import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BoardEntity } from './board.model';

export interface IColumn {
  id: string;
  title: string;
  order: number;
  board: BoardEntity;
}

@Entity()
export class ColumnEntity implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => BoardEntity, (board) => board.columns)
  board!: BoardEntity;
}
