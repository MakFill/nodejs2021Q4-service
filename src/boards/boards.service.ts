import { BoardEntity } from './entities/board.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>,
  ) {}

  private async changeBoard(board: CreateBoardDto, id?: string) {
    let boardId: string;
    if (!id) {
      boardId = (await this.boardsRepository.save(board)).id;
    } else {
      await this.boardsRepository.save({ ...board, id });
      boardId = id;
    }

    const boardItem = await this.findOne(boardId);

    return boardItem;
  }

  async create(createBoardDto: CreateBoardDto) {
    return this.changeBoard(createBoardDto);
  }

  async findAll() {
    return this.boardsRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'column')
      .getMany();
  }

  async findOne(id: string) {
    return this.boardsRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'column')
      .where('board.id = :id', { id })
      .getOne();
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const isExist = await this.findOne(id);
    if (isExist) {
      await this.remove(id);
      return this.changeBoard(updateBoardDto, id);
    } else {
      return null;
    }
  }

  async remove(id: string) {
    return this.boardsRepository
      .createQueryBuilder()
      .delete()
      .from(BoardEntity)
      .where('id = :id', { id })
      .execute();
  }
}
