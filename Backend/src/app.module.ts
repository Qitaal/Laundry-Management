import { Module } from '@nestjs/common';
import { ClothesModule } from './clothes/clothes.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'src/config/ormconfig';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOption),
    ClothesModule,
    UsersModule,
    AuthModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
