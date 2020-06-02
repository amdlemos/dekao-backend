import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";

export class Address {
    @ApiProperty()
    zipcode: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Logradouro é obrigatório.'})
    @IsString()
    @MinLength(5, { message: 'Logradouro deve conter no mínimo 5 caracteres.'})
    @MaxLength(130, { message: 'Logradouro deve conter no máximo 130 caracteres.'})
    street: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Número é obrigatório.'})
    @IsString()
    @MinLength(5, { message: 'Número deve conter no mínimo 1 caracteres.'})
    @MaxLength(20, { message: 'Número deve conter no máximo 20 caracteres.'})
    number: string;

    @ApiProperty()    
    @IsString()    
    @MaxLength(50, { message: 'Complemento deve conter no máximo 50 caracteres.'})
    complement: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Bairro é obrigatório.'})
    @IsString()    
    @MinLength(5, { message: 'Bairro deve conter no mínimo 5 caracteres.'})
    @MaxLength(50, { message: 'Bairro deve conter no máximo 50 caracteres.'})
    neighborhood: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Cidade é obrigatório.'})
    city_code: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Estado é obrigatório.'})
    state_code: string;
}