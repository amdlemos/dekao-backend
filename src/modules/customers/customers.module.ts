import { CustomersDao } from './customers.dao';
import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomersSyncController } from './customers-sync.controller';

@Module({
  controllers: [CustomersController, CustomersSyncController],
  providers: [CustomersService, CustomersDao]
})
export class CustomersModule {}
