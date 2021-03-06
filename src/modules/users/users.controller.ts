import { UsersService } from './users.service';
import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersDao } from './users.dao';
import { User } from '../../models/user.model';
//import { validate } from 'class-validator';
import * as moment from 'moment';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(
        private readonly _usersDAO: UsersDao,
        private readonly _usersService: UsersService) { }

    @Get()        
    async getAllUsers(): Promise<User[]> {
        return await this._usersDAO.getAllUsers();
    }   

    @Get(':_id')
    async getById(@Param('_id') id: string) {
        console.log(id);
        return await this._usersDAO.getUserById(id);
    }

    @Post()
    async createUser(@Body() user: User) {
        return await this._usersService.register(user);
    }

    @Put()
    async editUser(@Body() user: User) {
        return await this._usersDAO.updateOneUser(user);
    }

    @Delete(':_id')
    async deleteUser(@Param('_id') id: string) {
        console.log(id);
        return await this._usersDAO.deleteUser(id);
    }

    // @Post('/bulk')
    // async bulkUser(@Body() users: any[]) {
    //     console.log(users);
    //     return await this._usersDAO.bulkUser(users);
    // }

    // @Post('/bulkDelete')
    // async bulkDeleteUser(@Body() users: any[]) {
    //     console.log(users);
    //     return await this._usersDAO.bulkUser(users);
    // }
}
