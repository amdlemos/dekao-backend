import { Module, ValidationPipe } from '@nestjs/common';
import { MongoModule } from 'nest-mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CustomersModule } from './modules/customers/customers.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule.forRoot(process.env.MONGO_URI, process.env.DB_NAME,
      { useUnifiedTopology: true }
    ),
    UsersModule,
    AuthModule,
    CustomersModule,
  ],  
  providers: [
     // Adiciona o pipe de validação em um nível global.
    // Antes dos controllers receber o request será 
    // feita a validação conforme annotations dos modelos.       
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },    
    
  ],
})
export class AppModule { }
