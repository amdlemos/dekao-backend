import { UsersDao } from './users.dao';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';
import { UsersSyncController } from './users-sync.controller';

@Module({
    controllers:[UsersController, UsersSyncController],
    providers: [UsersService, UsersDao],
    exports: [UsersService, UsersDao]
})
export class UsersModule {}