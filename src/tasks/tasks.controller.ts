import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  @Get()
  getAll() {
    return ['Tarefa 1', 'Tarefa 2'];
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return { id, name: 'Tarefa exemplo' };
  }

  @Post()
  create(@Body() body: CreateTaskDto) {
    return { message: 'Tarefa criada', data: body };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return { message: 'Tarefa atualizada', id, data: body };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return { message: 'Tarefa removida', id };
  }
}
