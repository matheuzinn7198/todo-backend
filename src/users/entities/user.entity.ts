// src/users/entities/user.entity.ts
import { TaskEntity } from 'src/tasks/entities/tasks.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from 'src/common/enum/role.enum';
@Entity({ name: 'users' })
export class UserEntity {
@PrimaryGeneratedColumn()
id: number;
@Column({ unique: true })
email: string;
@Column()
password: string;
@Column({
type: 'enum',

enum: Role,
default: Role.User, // Todo novo usuário será 'user' por padrão
})
role: Role;
@OneToMany(() => TaskEntity, (task) => task.user) // ← task.user aponta de volta para aqui
  tasks: TaskEntity[]; // ← exatamente o nome que você usou em "user.tasks"
}