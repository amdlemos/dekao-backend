import { Address } from "./address.model";
import { ApiProperty } from "@nestjs/swagger";

export class Customer {
    // main data
    _id: string;    
    @ApiProperty()
    name: string;
    @ApiProperty()
    fantasyName: string;
    @ApiProperty()
    subscription: number;
    @ApiProperty()
    phone: number;
    @ApiProperty()
    email: string;
    @ApiProperty()    
    address1th: Address;            
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

