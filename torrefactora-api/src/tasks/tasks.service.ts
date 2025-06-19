import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Status } from 'src/status/entities/status.entity';
import { Priority } from 'src/priority/entities/priority.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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

  async update(id: number, data: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) throw new Error(`Task con id ${id} no encontrada`);

    console.log(data);
    if (data.priorityId) {
      const priority = await this.priorityRepository.findOne({
        where: { id: data.priorityId },
      });
      if (!priority)
        throw new Error(`Priority con id ${data.priorityId} no encontrada`);
      task.priority = priority;
    }

    if (data.statusId) {
      const status = await this.statusRepository.findOne({
        where: { id: data.statusId },
      });
      if (!status)
        throw new Error(`Status con id ${data.statusId} no encontrada`);
      task.status = status;
    }

    Object.assign(task, {
      nombre: data.nombre ?? task.nombre,
      descripcion: data.descripcion ?? task.descripcion,
      duracion: data.duracion ?? task.duracion,
      beginDate: data.beginDate ?? task.beginDate,
      endDate: data.endDate ?? task.endDate,
    });
    console.log(task);
    return this.tasksRepository.save(task);
  }

  remove(id: number) {
    return this.tasksRepository.delete(id);
  }

  async getDashboard() {
    const tareas: Task[] = await this.tasksRepository.find({
      relations: ['subtareas', 'priority', 'status'],
    });

    const prioridadValor: Record<string, number> = {
      Urgente: 0,
      Normal: 1,
      Bajo: 2,
    };

    const activas = tareas.filter((t) => t.status?.name !== 'Terminada');
    const terminadas = tareas.filter((t) => t.status?.name === 'Terminada');

    const activasOrdenadas = activas.sort((a, b) => {
      const prioridadA = prioridadValor[a.priority?.name] ?? Infinity;
      const prioridadB = prioridadValor[b.priority?.name] ?? Infinity;

      if (prioridadA !== prioridadB) {
        return prioridadA - prioridadB;
      }

      return a.duracion - b.duracion;
    });

    return [...activasOrdenadas, ...terminadas];
  }
}
