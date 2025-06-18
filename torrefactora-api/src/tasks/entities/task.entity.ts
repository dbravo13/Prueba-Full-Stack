import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Subtask } from '../../subtasks/entities/subtask.entity';
import { Status } from '../../status/entities/status.entity';
import { Priority } from '../../priority/entities/priority.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  duracion: number;

  @Column({ type: 'timestamp', nullable: true })
  beginDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @ManyToOne(() => Status, (status) => status.tasks, { eager: true })
  status: Status;

  @ManyToOne(() => Priority, (priority) => priority.tasks, { eager: true })
  priority: Priority;

  @OneToMany(() => Subtask, (subtask) => subtask.task, { cascade: true })
  subtareas: Subtask[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
