import { Module, ValidationPipe } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { APP_PIPE } from '@nestjs/core';
import { Cloth } from './entities/cloth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothRepository } from './repositories/cloth.repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Cloth])],
  controllers: [ClothesController],
  providers: [
    ClothesService,
    ClothRepository,
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
