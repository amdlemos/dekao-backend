import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),      
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: any, done: Function) {
    return { userId: payload.sub, username: payload.username };
  }
}