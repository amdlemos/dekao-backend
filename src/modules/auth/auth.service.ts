import { Login } from './../../models/login.model';
import { UsersService } from './../users/users.service';
import { Injectable } from "@nestjs/common";

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(
        private readonly _usersService: UsersService
        ) {
        
    }

    async login(login: Login) {
        const user = await this._usersService.findOneByUsername(login.username);
        if(!user){
            let error = 'Usuário não cadastrado';
            return error;
        }

        const isMatch = bcrypt.compareSync(login.password, user.password);

        if(isMatch){
            //TODO: gera e retorna o token.
            return true;
        }

        return false;
    }
}