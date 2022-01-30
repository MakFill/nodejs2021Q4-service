import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NestResponse } from '../utils';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('boardId') boardId: string,
  ) {
    return this.tasksService.create(boardId, createTaskDto);
  }

  @Get()
  async findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get(':taskId')
  async findOne(
    @Param('boardId') boardId: string,
    @Param('taskId') id: string,
  ) {
    const task = await this.tasksService.findOne(boardId, id);
    if (!task) {
      throw new NotFoundException({ message: `Task not found` });
    } else {
      return task;
    }
  }

  @Put(':taskId')
  async update(
    @Param('boardId') boardId: string,
    @Param('taskId') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.update(boardId, id, updateTaskDto);
    if (!task) {
      throw new NotFoundException({ message: `Task not found` });
    } else {
      return task;
    }
  }

  @Delete(':taskId')
  async remove(
    @Param('boardId') boardId: string,
    @Param('taskId') id: string,
    @Res() response: NestResponse,
  ) {
    const task = await this.tasksService.remove(boardId, id);
    if (task.affected) {
      response.status(HttpStatus.NO_CONTENT).send();
    } else {
      throw new NotFoundException({ message: `Task not found` });
    }
  }
}
