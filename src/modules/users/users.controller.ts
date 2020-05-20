import { UsersService } from './users.service';
import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersDao } from './users.dao';
import { User } from '../../models/user.model';
//import { validate } from 'class-validator';
import * as moment from 'moment';


@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private readonly _usersDAO: UsersDao,
        private readonly _usersService: UsersService) { }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this._usersDAO.getAllUsers();
    }

    // @Get(':lastUpdate')
    // async getUsersToUpdateDbClient(@Param('lastUpdate') lastUpdate: string) {        
    //     let date = moment(lastUpdate).toDate();
    //     return await this._usersDAO.getUsersToUpdateIndexedDb(date);       
    // }

    @Get(':_id')
    async getById(@Param('_id') id: string) {
        console.log(id);
        return await this._usersDAO.getUserById(id);
    }

    @Post()
    async createUser(@Body() user: User) {
        return await this._usersService.register(user);
    }

    @Post('/bulk')
    async bulkUser(@Body() users: any[]) {
        console.log(users);
        return await this._usersDAO.bulkUser(users);
    }

    @Post('/bulkDelete')
    async bulkDeleteUser(@Body() users: any[]) {
        console.log(users);
        return await this._usersDAO.bulkUser(users);
    }

    @Delete(':_id')
    async deleteUser(@Param('_id') id: string) {
        console.log(id);
        return await this._usersDAO.deleteUser(id);
    }

    @Put()
    async editUser(@Body() user: User) {
        return await this._usersDAO.updateOneUser(user);
    }

}
