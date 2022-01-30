import { IsAlphanumeric, IsUUID } from 'class-validator';
import { IBoard } from '../interfaces/board.interface';
// import { BoardDto } from './board.dto';

export class ColumnDto {
  @IsUUID()
  id: string;

  @IsAlphanumeric()
  title: string;

  @IsAlphanumeric()
  order: number;

  board: IBoard;
}
