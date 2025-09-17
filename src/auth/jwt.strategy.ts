// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'marco-silva-2007', // O mesmo segredo do módulo
    });
  }

  /**
   * @param payload - O conteúdo decodificado do token JWT (o que colocamos lá durante o login).
   */
  async validate(payload: any) {
    // O que este método retorna, o NestJS anexa ao objeto 'request' como 'req.user'.
    // No nosso caso, o payload contém o email e o 'sub' (ID do usuário).
    // Estamos retornando um objeto com esses dados para que possamos acessá-los
    // facilmente em nossos controllers protegidos.
    return { userId: payload.sub, email: payload.email };
  }
}