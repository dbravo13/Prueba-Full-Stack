import { Controller, Get } from '@nestjs/common';
import { PriorityService } from './priority.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Priority')
@Controller('priority')
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las prioridades' })
  @ApiResponse({
    status: 200,
    description: 'Lista de prioridades disponibles',
  })
  findAll() {
    return this.priorityService.findAll();
  }
}
