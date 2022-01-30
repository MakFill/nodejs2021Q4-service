import { ITask } from './task.interface';

export type ITaskBody = Omit<ITask, 'id'>;
