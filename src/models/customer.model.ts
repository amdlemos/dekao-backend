import { Address } from "./address.model";
import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength, IsString, IsNotEmpty, IsNumber, IsEmail } from "class-validator";

export class Customer {
    // main data
    _id: string;    
    @ApiProperty()
    @IsNotEmpty({ message: 'Nome do cliente é obrigatório.'})
    @IsString()
    @MinLength(4, { message: 'Nome do cliente deve conter no mínimo 4 caracteres.'})
    @MaxLength(300, { message: 'Nome do cliente deve conter no máximo 300 caracteres.'})
    name: string;
    
    @ApiProperty()    
    @IsString()   
    @MaxLength(300, { message: 'Nome do cliente deve conter no máximo 300 caracteres.'})
    fantasyName: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'CNPJ é obrigatorio.'})
    @IsString()    
    subscription: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Telefone é obrigatorio.'})
    @IsString()    
    phone: number;
    
    @ApiProperty()    
    @IsEmail()
    @MaxLength(100, {message: 'Email deve conter no máximo 100 caracteres.'})
    email: string;
    
    @ApiProperty()    
    address: Address;            
    // contacts: Contact[];    
    // otherAddress: Address[];    
    // legalData: LegalData;

    // sytem data 
    @ApiProperty()   
    code: string; 
    @ApiProperty()
    sellerCode: string;
    @ApiProperty()
    sellerName: string;   
    @ApiProperty()
    lastUpdate: Date;
    @ApiProperty()
    createdDate: Date;
}

