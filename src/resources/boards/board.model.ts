import { v4 as uuid } from 'uuid';
import { IBoardReqBody, IColumn } from '../interfaces';

export class Board {
  public id;

  public title;

  public columns: IColumn[];

  /**
   * Create new board by title and columns and generate id by uuid v4.
   * @param boardFromFE - board object IBoardReqBody.
   * @returns board object with id === uuid v4 IBoardResBody.
   */

  constructor(boardFromFE: IBoardReqBody) {
    this.id = uuid();
    this.title = boardFromFE.title;
    this.columns = boardFromFE.columns;
  }
}
