import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));


  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3002 },
  });

  await app.startAllMicroservices();

  const config = new DocumentBuilder()
    .setTitle('Orders Service')
    .setDescription('APIs for Orders')
    .setVersion('1.0')
    .addTag('orders')
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, doc);

  await app.listen(3002);
  console.log('🚀 Orders Service running at http://localhost:3002');
  console.log('📚 Swagger Docs: http://localhost:3002/docs');
}
bootstrap();