import { IBoard } from './board.interface';

export type IBoardBody = Omit<IBoard, 'id'>;
