import { CustomersDao } from './customers.dao';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
    constructor(private _customersDao: CustomersDao){

    }
}
