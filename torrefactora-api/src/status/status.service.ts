import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async seedDefaults() {
    const existing = await this.statusRepository.find();
    if (existing.length === 0) {
      const defaults = [
        { name: 'Iniciada' },
        { name: 'En Proceso' },
        { name: 'Terminada' },
      ];
      await this.statusRepository.save(defaults);
    }
  }

  findAll() {
    return this.statusRepository.find();
  }
}
