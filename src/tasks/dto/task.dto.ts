import { IsUUID, IsNumber, IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsNumber()
  order: number;

  @IsNotEmpty()
  description: string;

  userId: string | null;

  boardId: string;

  columnId: string | null;
}
