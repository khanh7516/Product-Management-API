import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      transform:true,
    }
  ));

  app.setGlobalPrefix('api/v1');
  // app.useGlobalFilters(new AllExceptionsFilter()); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
