import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtask } from './entities/subtask.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask)
    private subtaskRepo: Repository<Subtask>,
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  async create(taskId: number, data: Partial<Subtask>) {
    const task = await this.taskRepo.findOne({ where: { id: taskId } });
    if (!task) throw new NotFoundException('Task not found');

    const subtask = this.subtaskRepo.create({ ...data, task });
    return this.subtaskRepo.save(subtask);
  }

  findAll() {
    return this.subtaskRepo.find({ relations: ['task'] });
  }

  async update(id: number, data: Partial<Subtask>) {
    await this.subtaskRepo.update(id, data);
    return this.subtaskRepo.findOne({ where: { id }, relations: ['task'] });
  }

  remove(id: number) {
    return this.subtaskRepo.delete(id);
  }
}
