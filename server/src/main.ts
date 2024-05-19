import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //additional variable
  const APP_PORT = Number(process.env.APP_PORT);
  const APP_VERSION = process.env.APP_VERSION

  //enablee built in module
  app.enableCors();
  app.enableVersioning({
     type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());

  //setup swagger
  const config = new DocumentBuilder()
  .setTitle('API Docs')
  .setDescription('API Documentation')
  .setVersion(APP_VERSION)
  .addBearerAuth({
     type:'http',
     scheme:'bearer',
     bearerFormat:'JWT',
     name:'JWT',
     in:'header'
  }, 'JWT')
  .build();

  const document = SwaggerModule.createDocument(app, config); 

  SwaggerModule.setup('docs', app, document);

  await app.listen(Number(APP_PORT));
 
  console.log(`App Run on the Port: ${APP_PORT}`);
  console.log(`Run the Docs in this URL: http://localhost:${APP_PORT}/docs`);

}
bootstrap();
