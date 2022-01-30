import { IsNotEmpty, IsArray, IsUUID } from 'class-validator';
import { IColumn } from '../interfaces/column.interface';

export class BoardDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsArray()
  columns: IColumn[];
}
