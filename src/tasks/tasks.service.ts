import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto) {
    const { identifiers } = await this.tasksRepository
      .createQueryBuilder()
      .insert()
      .into(TaskEntity)
      .values([{ ...createTaskDto, boardId }])
      .execute();

    const task = await this.findOne(boardId, identifiers[0]?.id);
    return task;
  }

  async findAll(boardId: string) {
    const tasks = await this.tasksRepository
      .createQueryBuilder('task')
      .where('task.boardId = :boardId', { boardId })
      .getMany();
    return tasks;
  }

  async findOne(boardId: string, id: string) {
    const task = await this.tasksRepository
      .createQueryBuilder('task')
      .where('task.boardId = :boardId', { boardId })
      .andWhere('task.id = :id', { id })
      .getOne();
    return task;
  }

  async update(boardId: string, id: string, updateTaskDto: UpdateTaskDto) {
    await this.tasksRepository
      .createQueryBuilder()
      .update(TaskEntity)
      .set(updateTaskDto)
      .where('boardId = :boardId', { boardId })
      .andWhere('id = :id', { id })
      .execute();
    return this.findOne(boardId, id);
  }

  remove(boardId: string, id: string) {
    return this.tasksRepository
      .createQueryBuilder()
      .delete()
      .from(TaskEntity)
      .where('boardId = :boardId', { boardId })
      .andWhere('id = :id', { id })
      .execute();
  }
}
