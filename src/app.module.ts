import { UsersModule } from './modules/users/users.module';

import { Module, ValidationPipe } from '@nestjs/common';
import { MongoModule } from 'nest-mongodb';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongoModule.forRoot(process.env.MONGO_URI, process.env.DB_NAME,
      { useUnifiedTopology: true }
    ),
    UsersModule,
  ],
  controllers: [],
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
