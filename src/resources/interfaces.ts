import { IColumn } from './boards/column.model';

export interface IUserResBody {
  id: string;
  name: string;
  login: string;
  password: string;
}

export interface IBoardResBody {
  id: string;
  title: string;
  columns: IColumn[];
}

export interface ITaskResBody {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

export interface IUserReqParam {
  userId: string;
}

export interface ITaskReqParam {
  boardId: string;
  taskId: string;
}

export interface IBoardReqParam {
  boardId: string;
}

export interface ILoginBody {
  login: string;
  password: string;
}
