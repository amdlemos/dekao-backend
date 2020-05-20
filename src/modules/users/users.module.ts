import { UsersDao } from './users.dao';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers:[UsersController],
    providers: [UsersService, UsersDao],
    exports: [UsersService, UsersDao]
})
export class UsersModule {}