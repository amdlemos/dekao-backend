import { IsEmail, IsNotEmpty, IsDate, MinLength, MaxLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class User {

    @ApiProperty()
    _id: string;

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
    
    @ApiProperty()
    @IsEmail({}, {message: 'Email inválido.'})
    @IsNotEmpty({ message: 'Email é obrigatório.'})
    email: string;
    
    @ApiProperty()
    roles: [string]    
   
    createdDate: Date; 
    lastUpdate: Date;

    
}

export class UserFrontend {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Nome do usuário é obrigatório.'})
    @IsString()
    @MinLength(4, { message: 'Nome do usuário deve conter no mínimo 4 caracteres.'})
    @MaxLength(20, { message: 'Nome do usuário deve conter no máximo 20 caracteres.'})
    username: string;
    
    @ApiProperty()
    @IsEmail({}, {message: 'Email inválido.'})
    @IsNotEmpty({ message: 'Email é obrigatório.'})
    email: string;
    
    @ApiProperty()
    roles: [string]    
   
    createdDate: Date; 
    lastUpdate: Date;
}