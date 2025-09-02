import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

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
  create(@Body() body: any) {
    return { message: 'Tarefa criada', data: body };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return { message: 'Tarefa atualizada', id, data: body };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return { message: 'Tarefa removida', id };
  }
}