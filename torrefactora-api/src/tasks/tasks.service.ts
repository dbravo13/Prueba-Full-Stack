import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Status } from 'src/status/entities/status.entity';
import { Priority } from 'src/priority/entities/priority.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
    @InjectRepository(Priority)
    private priorityRepository: Repository<Priority>,
  ) {}

  async create(data: CreateTaskDto) {
    const status = await this.statusRepository.findOne({
      where: { id: data.statusId },
    });

    if (!status) {
      throw new Error(`Status con id ${data.statusId} no encontrado`);
    }

    const priority = await this.priorityRepository.findOne({
      where: { id: data.priorityId },
    });

    if (!priority) {
      throw new Error(`Priority con id ${data.priorityId} no encontrado`);
    }

    const task = this.tasksRepository.create({
      nombre: data.nombre,
      descripcion: data.descripcion,
      duracion: data.duracion,
      beginDate: data.beginDate,
      endDate: data.endDate,
      status,
      priority,
    });

    return this.tasksRepository.save(task);
  }

  findAll() {
    return this.tasksRepository.find({ relations: ['subtareas'] });
  }

  findOne(id: number) {
    return this.tasksRepository.findOne({
      where: { id },
      relations: ['subtareas'],
    });
  }

  async update(id: number, data: Partial<Task>) {
    await this.tasksRepository.update(id, data);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }

  async getDashboard() {
    const tareas: Task[] = await this.tasksRepository.find({
      relations: ['subtareas', 'priority'],
    });

    const prioridadValor: Record<string, number> = {
      Urgente: 1,
      Normal: 2,
      Bajo: 3,
    };

    const ordenadas = tareas.sort((a, b) => {
      const prioridadA = prioridadValor[a.priority?.name ?? 'Normal'];
      const prioridadB = prioridadValor[b.priority?.name ?? 'Normal'];

      if (prioridadA !== prioridadB) {
        return prioridadA - prioridadB;
      }

      return a.duracion - b.duracion;
    });

    return ordenadas;
  }
}
