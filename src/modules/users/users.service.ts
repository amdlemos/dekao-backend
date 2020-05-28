import { HttpException, HttpStatus } from '@nestjs/common';
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
        let error = '';
        if(user){
            error = 'Este email ja está em uso. Tente outro'
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }

        user = await this.findOneByUsername(userToRegister.username);
        if(user){
            error = 'Nome de usuário já está em uso. Tente outro.';
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }

        const newUser = new User();
        newUser.username = userToRegister.username;
        newUser.email = userToRegister.email;        
        newUser.password = await this.hashPassword(userToRegister.password);        
     
        return await this.userDao.addUser(newUser);
    }

    private async hashPassword(password: string): Promise<string | undefined> {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);        
        
        return hash;
    }


}
