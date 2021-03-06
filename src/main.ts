import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT;


async function bootstrap() {
  // cria a aplicação
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // configura o swagger
  swaggerConfig(app);

  //body parser for the params
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //user CORS
  app.use(cors()); 

  // TODO: create log class
  // custom Middleware for logging the each request going to the API
  app.use((req, res, next) => {
    if (req.body) console.info('Body:', req.body);
    if (req.params) console.info('Params:', req.params);
    if (req.query) console.info('Query:', req.query);
    console.info(`Received a ${req.method} request from ${req.ip} for ${req.url}`);
    next();
  });

  // inicia a aplicação   
  
  await app.listen(port, () => {
    console.log('\x1b[33m', `Listening on port ${port}.`)
  });
}
bootstrap();

/**
 * Configura e inicia o Swagger em http://localhost:port/api .
 * @param {NestExpressApplication} app - Uma instância da aplicação.
 */
function swaggerConfig(app: NestExpressApplication) {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Dekão Cosméticos')
    .setDescription('')
    .setVersion('1.0')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer'
    })
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, swaggerDocument);
}

