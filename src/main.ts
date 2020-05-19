import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.services';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Get app config for cors settings and starting the app.
  const appConfig: AppConfigService = app.get('AppConfigService');  

  // TODO: create log class
  // custom Middleware for logging the each request going to the API
  app.use((req, res, next) => {
    if (req.body) console.info('Body:', req.body);
    if (req.params) console.info('Params:', req.params);
    if (req.query) console.info('Query:',req.query);
    console.info(`Received a ${req.method} request from ${req.ip} for                ${req.url}`);
    next();
  });

  // inicia a aplicação    
  await app.listen(appConfig.port, () => {
    console.log('\x1b[33m', `Listening on port ${appConfig.port}.`)
  });
}
bootstrap();
