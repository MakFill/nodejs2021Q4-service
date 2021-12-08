import { v4 as uuid } from 'uuid';
import { ITaskReqBody } from '../interfaces';

export class Task {
  id;

  title;

  order;

  description;

  userId;

  boardId: string;

  columnId;

  constructor(taskFromFE: ITaskReqBody) {
    this.id = uuid();
    this.title = taskFromFE.title;
    this.order = taskFromFE.order;
    this.description = taskFromFE.description;
    this.userId = taskFromFE.userId;
    this.boardId = taskFromFE.boardId;
    this.columnId = taskFromFE.columnId;
  }
}
