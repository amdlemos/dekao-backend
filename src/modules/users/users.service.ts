import { Injectable } from '@nestjs/common';

import { UsersDao } from './users.dao';
import { User } from '../../models/user.model';


@Injectable()
export class UsersService {
    private readonly user: User
    

    constructor(private readonly userDao: UsersDao) {
        
    }

    async findOneByUsername(username: string): Promise<User | undefined>{        
        return await this.userDao.getUserByUsername(username);
    }
}
