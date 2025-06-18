import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { Subtask } from './entities/subtask.entity';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post(':taskId')
  create(@Param('taskId') taskId: string, @Body() body: Partial<Subtask>) {
    return this.subtasksService.create(+taskId, body);
  }

  @Get()
  findAll() {
    return this.subtasksService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Subtask>) {
    return this.subtasksService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtasksService.remove(+id);
  }
}
