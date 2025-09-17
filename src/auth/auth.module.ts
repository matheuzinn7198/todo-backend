// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module'; // Importar UsersModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Importar para que possamos usar o UsersService
    PassportModule,
    JwtModule.register({
      secret: 'marco-silva-2007', // Mude isso para uma variável de ambiente em produção!
      signOptions: { expiresIn: '1h' }, // Token expira em 60 minutos
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}