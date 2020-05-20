import { UsersDao } from './users.dao';
import { UsersService } from './users.service';
import { UsersController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers:[UsersController],
    providers: [UsersService, UsersDao],
    exports: []
})
export class UsersModule {}