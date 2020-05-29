
import { Controller, Get, Param } from '@nestjs/common';

import { AddressDao } from './address.dao';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {
    constructor(private _addressDao: AddressDao) {
        
    } 

    @Get()
    async getStates(){
        return await this._addressDao.getStates();
    }

    @Get(':state_code')
    async getCitiesByState(@Param('state_code') stateCode: number){
        
        return await this._addressDao.getCitiesByState(stateCode);
    }

}
