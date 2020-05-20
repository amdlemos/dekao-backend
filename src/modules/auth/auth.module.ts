import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';

@Module({
    controllers:[AuthController],
    imports: [
        UsersModule,
        PassportModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            secret: process.env.SECRET,
            signOptions: { expiresIn: '60s' },
          }),],
    providers: [AuthService, JwtStrategy],    
    exports: []
})
export class AuthModule {}