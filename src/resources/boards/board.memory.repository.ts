import { EntityRepository, Repository, getConnection } from 'typeorm';
import { TaskEntity } from '../tasks/task.model';
import { ColumnEntity } from './column.model';
import { BoardEntity } from './board.model';

@EntityRepository(BoardEntity)
export class BoardRepo extends Repository<BoardEntity> {
  async getAll() {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'column')
      .getMany();
  }

  async getOne(id: BoardEntity['id']) {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'column')
      .where('board.id = :id', { id })
      .getOne();
  }

  async add(board: Partial<BoardEntity>) {
    return this._changeBoard(board);
  }

  async removeBoard(id: BoardEntity['id']) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(TaskEntity)
      .where('boardId = :id', { id })
      .execute();

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ColumnEntity)
      .where('boardId = :id', { id })
      .execute();

    return this.createQueryBuilder()
      .delete()
      .from(BoardEntity)
      .where('id = :id', { id })
      .execute();
  }

  async updateBoard(id: BoardEntity['id'], board: Partial<BoardEntity>) {
    await this.removeBoard(id);
    return this._changeBoard(board, id);
  }

  async _changeBoard(board: Partial<BoardEntity>, id?: BoardEntity['id']) {
    let boardId: string;
    if (!id) {
      boardId = (await this.save(board)).id;
    } else {
      await this.save({ ...board, id });
      boardId = id;
    }

    if (board.columns) {
      const items = board.columns.map((item: Partial<ColumnEntity>) => {
        const model = new ColumnEntity();
        model.order = item.order ?? 1;
        model.title = item.title ?? '';
        if (item.id) {
          model.id = item.id;
        }
        model.board = { ...board, id: boardId } as BoardEntity;
        return model;
      });

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(ColumnEntity)
        .values([...items])
        .execute();
    }

    return this.getOne(boardId);
  }
}
