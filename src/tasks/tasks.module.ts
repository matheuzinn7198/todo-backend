// src/tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskEntity } from './entities/tasks.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
  ],
  providers: [TasksService],
  controllers: [TasksController],
  exports: [TasksService], // só se outro módulo precisar usar esse serviço
})
export class TasksModule {}