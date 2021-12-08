import { v4 as uuid } from 'uuid';
import { IBoardReqBody, IColumn } from '../interfaces';

export class Board {
  public id;

  public title;

  public columns: IColumn[];

  constructor(boardFromFE: IBoardReqBody) {
    this.id = uuid();
    this.title = boardFromFE.title;
    this.columns = boardFromFE.columns;
  }
}
