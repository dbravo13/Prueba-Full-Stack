import { Module } from '@nestjs/common';
import { SubtasksController } from './subtasks.controller';
import { SubtasksService } from './subtasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './entities/subtask.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subtask, Task])],
  controllers: [SubtasksController],
  providers: [SubtasksService],
})
export class SubtasksModule {}
