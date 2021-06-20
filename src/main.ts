import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // app.use(json());
  // app.use(urlencoded({ extended: false }));
  // app.enableCors()
  // await app.init();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.init();
  if (process.env.MODE == "DEV") {
    const config = new DocumentBuilder()
    .setTitle('HYPE backend API documentations!')
    .setDescription('For most endpoints, it requries authorization. Please paste in the firebase authenication token by click on the Lock button to the right.')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'firebaseIDToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  }
  const port = process.env.PORT || 4200;

  await app.listen(port, '0.0.0.0');
  console.log('listening on: PORT:' + port);
}
bootstrap();
