import { AddressDao } from './address.dao';
import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  providers: [AddressService, AddressDao],
  exports: [AddressService, AddressDao],
  controllers: [AddressController]
})
export class AddressModule {}
