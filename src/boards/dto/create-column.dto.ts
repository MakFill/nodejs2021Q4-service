import { OmitType } from '@nestjs/mapped-types';
import { ColumnDto } from './column.dto';

export class CreateColumnDto extends OmitType(ColumnDto, ['id']) {}
