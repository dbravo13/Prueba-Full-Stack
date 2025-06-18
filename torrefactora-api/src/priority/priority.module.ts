import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Priority } from './entities/priority.entity';
import { PriorityService } from './priority.service';
import { PriorityController } from './priority.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Priority])],
  providers: [PriorityService],
  controllers: [PriorityController],
  exports: [TypeOrmModule, PriorityService],
})
export class PriorityModule {}
