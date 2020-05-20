import { UsersDao } from './../users/users.dao';
import { UsersService } from './../users/users.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
    controllers:[AuthController],
    providers: [AuthService, UsersService, UsersDao],
    exports: []
})
export class AuthModule {}