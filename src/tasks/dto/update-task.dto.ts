import { OmitType } from '@nestjs/mapped-types';
import { TaskDto } from './task.dto';

export class UpdateTaskDto extends OmitType(TaskDto, ['id']) {}
