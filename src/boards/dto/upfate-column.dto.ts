import { OmitType } from '@nestjs/mapped-types';
import { ColumnDto } from './column.dto';

export class UpdateColumnDto extends OmitType(ColumnDto, ['id']) {}
