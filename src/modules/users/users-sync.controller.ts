import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersDao } from './users.dao';
import * as moment from 'moment';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';


@ApiTags('users-sync')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('userssync')
export class UsersSyncController {
    constructor(
        private readonly _usersDAO: UsersDao,
        private readonly _usersService: UsersService) { }

    @Get(':lastUpdate')
    async getUsersToUpdateDbClient(@Param('lastUpdate') lastUpdate: string) {
        let date = moment(lastUpdate).toDate();
        return await this._usersDAO.getUsersToUpdateIndexedDb(date);
    }
}