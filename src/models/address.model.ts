import { ApiProperty } from "@nestjs/swagger";

export class Address {
    @ApiProperty()
    zipcode: number;
    @ApiProperty()
    street: string;
    @ApiProperty()
    number: string;
    @ApiProperty()
    complement: string;
    @ApiProperty()
    neighborhood: string;
    @ApiProperty()
    city_code: string;
    @ApiProperty()
    state_code: string;
}