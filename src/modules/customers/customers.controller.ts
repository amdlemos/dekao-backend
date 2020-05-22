import { CustomersDao } from './customers.dao';
import { Controller, Post, Body, UseGuards, Get, Put } from '@nestjs/common';
import { Customer } from 'src/models/customer.model';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
    constructor(private _customerDao: CustomersDao){

    }

    @Post()
    async create(@Body() customer: Customer) {
        return await this._customerDao.add(customer);
    }

    @Get()
    async getAll(){
        return await this._customerDao.getAll();
    }

    @Put()
    async edit(@Body() customer: Customer){
        //return await this._customerDao.edit();
    }

}
