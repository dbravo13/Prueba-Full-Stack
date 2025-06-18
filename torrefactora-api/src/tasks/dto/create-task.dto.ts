export class CreateTaskDto {
  nombre: string;
  descripcion: string;
  duracion: number;
  beginDate?: Date;
  endDate?: Date;
  statusId: number;
  priorityId: number;
}
