import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class Subtask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ default: false })
  completada: boolean;

  @ManyToOne(() => Task, (task) => task.subtareas, { onDelete: 'CASCADE' })
  task: Task;
}
