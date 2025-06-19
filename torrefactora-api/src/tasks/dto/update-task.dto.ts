export class UpdateTaskDto {
  nombre?: string;
  descripcion?: string;
  duracion?: number;
  beginDate?: Date;
  endDate?: Date;
  priorityId?: number;
  statusId?: number;
}
