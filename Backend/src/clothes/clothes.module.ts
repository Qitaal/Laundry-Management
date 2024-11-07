import { Module, ValidationPipe } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [ClothesController],
  providers: [
    ClothesService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class ClothesModule {}
