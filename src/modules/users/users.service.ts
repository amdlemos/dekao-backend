import { Injectable } from '@nestjs/common';

import { UsersDao } from './users.dao';
import { User } from '../../models/user.model';

const bcrypt = require('bcrypt');


@Injectable()
export class UsersService {
    private readonly user: User
    

    constructor(private readonly userDao: UsersDao) {
        
    }

    async findOneByUsername(username: string): Promise<User | undefined>{        
        return await this.userDao.getUserByUsername(username);
    }

    async findOneByEmail(email: string): Promise<User | undefined>{        
        return await this.userDao.getUserByEmail(email);
    }

    async register(userToRegister: User) : Promise<any> {
        let user  = await this.findOneByEmail(userToRegister.email);
        
        if(user){
            let error = 'Email já está em uso.';
            return error;
        }

        user = await this.findOneByUsername(userToRegister.username);
        if(user){
            let error = 'Nome de usuário já está em uso.';
            return error;
        }

        const newUser = new User();
        newUser.username = userToRegister.username;
        newUser.email = userToRegister.email;
        newUser.password = await this.hashPassword(userToRegister.password);
        console.log('newUser', newUser.password);
        return await this.userDao.addUser(newUser);
    }

    private async hashPassword(password: string): Promise<string | undefined> {
        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(password, salt);
        
        console.log(hash);
        return hash;
    }


}
