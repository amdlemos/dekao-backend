import { AuthService } from './auth.service';
import { Login } from './../../models/login.model';
import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @Post('/login')
    async login(@Body() login: Login) {
        return await this._authService.login(login);
    }

}