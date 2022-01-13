import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from './task.model';

@EntityRepository(TaskEntity)
export class TaskRepo extends Repository<TaskEntity> {
  async getAll(boardId: TaskEntity['boardId']) {
    return this.createQueryBuilder('task')
      .where('task.boardId = :boardId', { boardId })
      .getMany();
  }

  async getOne(boardId: TaskEntity['boardId'], taskId: TaskEntity['id']) {
    return this.createQueryBuilder('task')
      .where('task.boardId = :boardId', { boardId })
      .andWhere('task.id = :taskId', { taskId })
      .getOne();
  }

  async add(boardId: TaskEntity['boardId'], task: Partial<TaskEntity>) {
    const { identifiers } = await this.createQueryBuilder()
      .insert()
      .into(TaskEntity)
      .values([{ ...task, boardId }])
      .execute();

    return this.getOne(boardId, identifiers[0]?.id);
  }

  async removeTask(id: TaskEntity['id'], boardId: TaskEntity['boardId']) {
    return this.createQueryBuilder()
      .delete()
      .from(TaskEntity)
      .where('boardId = :boardId', { boardId })
      .andWhere('id = :id', { id })
      .execute();
  }

  async updateTask(
    id: TaskEntity['id'],
    boardId: TaskEntity['boardId'],
    task: Partial<TaskEntity>
  ) {
    await this.createQueryBuilder()
      .update(TaskEntity)
      .set(task)
      .where('boardId = :boardId', { boardId })
      .andWhere('id = :id', { id })
      .execute();
    return this.getOne(boardId, id);
  }
}
