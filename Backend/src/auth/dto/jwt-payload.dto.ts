import { IsNumber, IsString } from 'class-validator';

export class JwtPayloadDto {
  @IsString()
  email: string;

  @IsString()
  sub: string;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}
