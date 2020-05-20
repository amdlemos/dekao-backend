import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, MaxLength, IsEmail } from "class-validator";

export class Login {
    @ApiProperty()
    @IsNotEmpty({ message: 'Nome do usuário é obrigatório.'})
    @IsString()
    @MinLength(4, { message: 'Nome do usuário deve conter no mínimo 4 caracteres.'})
    @MaxLength(20, { message: 'Nome do usuário deve conter no máximo 20 caracteres.'})
    username: string;   

    @ApiProperty()
    @IsNotEmpty({ message: 'Password é obrigatório.'})
    @IsString()
    @MinLength(8, { message: 'Password deve conter no mínimo 8 caracteres.'})
    @MaxLength(30, { message: 'Password deve conter no máximo 30 caracteres.'})
    password: string;    
}