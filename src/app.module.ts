import { AppConfigModule } from './config/app/config.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoModule } from 'nest-mongodb';

@Module({
  imports: [   
    AppConfigModule,
    MongoModule.forRoot('mongodb://127.0.0.1:27017', 'dekaoCosmeticos', { useUnifiedTopology: true }), 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
