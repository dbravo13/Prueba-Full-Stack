import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Tareas')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  @ApiResponse({
    status: 201,
    description: 'Tarea creada exitosamente',
  })
  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  @ApiResponse({ status: 200, description: 'Lista de tareas' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('dashboard')
  @ApiOperation({
    summary:
      'Obtener el tablero de tareas ordenado por prioridad y duración (SJF)',
  })
  @ApiResponse({
    status: 200,
    description: 'Tablero con sugerencias de orden de atención',
  })
  getDashboard() {
    return this.tasksService.getDashboard();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea', type: Number })
  @ApiResponse({ status: 200, description: 'Tarea encontrada' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarea por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea', type: Number })
  @ApiResponse({ status: 200, description: 'Tarea actualizada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateTaskDto) {
    return this.tasksService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea', type: Number })
  @ApiResponse({ status: 200, description: 'Tarea eliminada' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
