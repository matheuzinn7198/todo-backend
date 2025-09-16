import { Injectable } from '@nestjs/common';
import { Tasks } from './tasks.interface';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getAllTasks(): Tasks[] {
    return this.tasks;
  }

  getTaskById(id: string): Tasks | undefined {
    return this.tasks.find(t => t.id === id);
  }

  createTask(title: string, description: string): Tasks {
    const task: Tasks = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      status: 'PENDING'
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, title?: string, description?: string, status?: 'PENDING' | 'DONE'): Task | undefined {
    const task = this.getTaskById(id);
    if (task) {
      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;
      return task;
    }
    return undefined;
  }

  deleteTask(id: string): boolean {
    const i = this.tasks.findIndex(t => t.id === id);
    if (i > -1) {
      this.tasks.splice(i, 1);
      return true;
    }
    return false;
  }
}