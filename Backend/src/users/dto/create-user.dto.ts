import { IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsString()
  email: string;

  @IsStrongPassword()
  password: string;
}
