import { Login } from './../../models/login.model';
import { UsersService } from './../users/users.service';
import { Injectable } from "@nestjs/common";
import { User } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(
        private readonly _usersService: UsersService,
        private _jwtService: JwtService,
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
            return await this.genereteToken(user);
        }

        return false;
    }

    private async genereteToken(user: User){
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this._jwtService.sign(payload)
        };
    }
}