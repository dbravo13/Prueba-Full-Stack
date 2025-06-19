import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los estatus de tareas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de estatus disponibles',
  })
  findAll() {
    return this.statusService.findAll();
  }
}
