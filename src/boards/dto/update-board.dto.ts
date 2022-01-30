import { OmitType } from '@nestjs/mapped-types';
import { BoardDto } from './board.dto';

export class UpdateBoardDto extends OmitType(BoardDto, ['id']) {}
