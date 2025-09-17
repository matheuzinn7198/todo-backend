// src/tasks/entities/task.entity.ts
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relacionamento: Muitas tarefas pertencem a um usuário
  @ManyToOne(() => UserEntity, (user) => user.tasks, { eager: true })
  user: UserEntity;
  tasks: TaskEntity[];
}