import { IsIn, IsInt, IsNumber, IsPositive } from 'class-validator';

export class IdParamDTO {
  @IsInt()
  @IsPositive()
  id: number;
}
