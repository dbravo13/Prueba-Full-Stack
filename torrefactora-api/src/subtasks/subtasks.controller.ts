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
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Subtareas')
@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post(':taskId')
  @ApiOperation({ summary: 'Crear una subtarea para una tarea específica' })
  @ApiParam({
    name: 'taskId',
    type: Number,
    description: 'ID de la tarea padre',
  })
  @ApiResponse({
    status: 201,
    description: 'Subtarea creada',
  })
  create(@Param('taskId') taskId: string, @Body() body: Partial<Subtask>) {
    return this.subtasksService.create(+taskId, body);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las subtareas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de subtareas',
  })
  findAll() {
    return this.subtasksService.findAll();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una subtarea por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la subtarea' })
  @ApiResponse({
    status: 200,
    description: 'Subtarea actualizada',
  })
  update(@Param('id') id: string, @Body() body: Partial<Subtask>) {
    return this.subtasksService.update(+id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una subtarea por su ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la subtarea' })
  @ApiResponse({ status: 200, description: 'Subtarea eliminada' })
  remove(@Param('id') id: string) {
    return this.subtasksService.remove(+id);
  }
}
