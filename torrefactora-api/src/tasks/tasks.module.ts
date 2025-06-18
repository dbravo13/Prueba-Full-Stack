import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Priority } from 'src/priority/entities/priority.entity';
import { Status } from 'src/status/entities/status.entity';
import { Subtask } from 'src/subtasks/entities/subtask.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Subtask, Status, Priority])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
