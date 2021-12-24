export interface IUserResBody {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type IUserReqBody = Omit<IUserResBody, 'id'>;

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

export interface IBoardResBody {
  id: string;
  title: string;
  columns: IColumn[];
}

export type IBoardReqBody = Omit<IBoardResBody, 'id'>;

export interface ITaskResBody {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

export type ITaskReqBody = Omit<ITaskResBody, 'id'>;

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
