import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { NestResponse } from '../utils';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  async findAll() {
    return this.boardsService.findAll();
  }

  @Get(':boardId')
  async findOne(@Param('boardId') boardId: string) {
    const board = await this.boardsService.findOne(boardId);
    if (!board) {
      throw new NotFoundException({ message: `Board ${boardId} not found` });
    } else {
      return board;
    }
  }

  @Put(':boardId')
  async update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const board = await this.boardsService.update(boardId, updateBoardDto);
    if (!board) {
      throw new NotFoundException({ message: `Board ${boardId} not found` });
    } else {
      return board;
    }
  }

  @Delete(':boardId')
  async remove(
    @Param('boardId') boardId: string,
    @Res() response: NestResponse,
  ) {
    const board = await this.boardsService.remove(boardId);
    if (board.affected) {
      response.status(HttpStatus.NO_CONTENT).send();
    } else {
      throw new NotFoundException({ message: `Board ${boardId} not found` });
    }
  }
}
