import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
}
