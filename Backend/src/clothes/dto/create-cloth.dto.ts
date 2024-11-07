import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClothDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  tag: string;
}
