import { IBoard } from './board.interface';

export interface IColumn {
  id: string;
  title: string;
  order: number;
  board?: IBoard;
}
