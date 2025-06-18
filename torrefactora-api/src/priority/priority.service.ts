import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Priority } from './entities/priority.entity';

@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(Priority)
    private priorityRepository: Repository<Priority>,
  ) {}

  async seedDefaults() {
    const existing = await this.priorityRepository.find();
    if (existing.length === 0) {
      const defaults = [
        { name: 'Urgente', description: 'Atención inmediata' },
        { name: 'Normal', description: 'Tareas comunes' },
        { name: 'Bajo', description: 'Poca importancia' },
      ];
      await this.priorityRepository.save(defaults);
    }
  }

  findAll() {
    return this.priorityRepository.find();
  }
}
