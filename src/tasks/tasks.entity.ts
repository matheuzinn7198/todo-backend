// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskEntity } from './entities/tasks.entity.ts';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {}

  /**
   * Cria uma nova tarefa associada ao usuário logado
   */
  async create(createTaskDto: CreateTaskDto, user: UserEntity): Promise<TaskEntity> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      user, // Associa automaticamente ao usuário autenticado
    });
    return await this.tasksRepository.save(task);
  }

  /**
   * Lista tarefas do usuário logado com paginação
   */
  async findAll(user: UserEntity, page: number = 1, limit: number = 10) {
    const [tasks, total] = await this.tasksRepository.findAndCount({
      where: { user: { id: user.id } }, // Só tarefas DO USUÁRIO
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: tasks,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
        limit,
      },
    };
  }

  /**
   * Busca uma tarefa específica do usuário logado
   */
  async findOne(id: string, user: UserEntity): Promise<TaskEntity> {
    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: user.id } }, // Garante que a tarefa pertence ao usuário
    });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found or not owned by you.`);
    }

    return task;
  }

  /**
   * Atualiza uma tarefa do usuário logado
   */
  async update(id: string, updateTaskDto: UpdateTaskDto, user: UserEntity): Promise<TaskEntity> {
    const task = await this.findOne(id, user); // Reutiliza a validação de permissão
    Object.assign(task, updateTaskDto); // Atualiza apenas os campos enviados
    return await this.tasksRepository.save(task);
  }

  /**
   * Remove uma tarefa do usuário logado
   */
  async remove(id: string, user: UserEntity): Promise<void> {
    const result = await this.tasksRepository.delete({
      id,
      user: { id: user.id }, // Só deleta se for do usuário
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found or not owned by you.`);
    }
  }

  /**
   * ADMIN ONLY: Lista todas as tarefas de todos os usuários (com paginação)
   */
  async findAllAdmin(page: number = 1, limit: number = 10) {
    const [tasks, total] = await this.tasksRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user'], // Inclui dados do usuário dono da tarefa
      order: { createdAt: 'DESC' },
    });

    return {
      data: tasks,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
        limit,
      },
    };
  }
}