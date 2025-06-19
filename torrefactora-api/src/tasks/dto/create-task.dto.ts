import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Preparar café', description: 'Nombre de la tarea' })
  nombre: string;

  @ApiProperty({
    example: 'Preparar lote de café para entrega a cliente',
    description: 'Descripción detallada de la tarea',
  })
  descripcion: string;

  @ApiProperty({
    example: 30,
    description: 'Duración estimada en minutos',
  })
  duracion: number;

  @ApiProperty({
    example: '2025-06-19T08:00:00.000Z',
    description: 'Fecha y hora de inicio (opcional)',
    required: false,
  })
  beginDate?: Date;

  @ApiProperty({
    example: '2025-06-19T08:30:00.000Z',
    description: 'Fecha y hora de finalización (opcional)',
    required: false,
  })
  endDate?: Date;

  @ApiProperty({
    example: 1,
    description: 'ID del estado de la tarea (ej. Iniciada, En Proceso)',
  })
  statusId: number;

  @ApiProperty({
    example: 2,
    description: 'ID de la prioridad de la tarea (ej. Urgente, Normal)',
  })
  priorityId: number;
}
