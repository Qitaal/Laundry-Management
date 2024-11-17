import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersService } from 'src/users/users.service';
import { LocalGuard } from './guards/local-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  @HttpCode(200)
  login(@Request() req) {
    const user: User = req.user;

    return { access_token: this.authService.getAccessToken(user) };
  }

  @Post('/register')
  @HttpCode(201)
  async register(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.usersService.create(registerUserDto);

    return plainToInstance(User, user);
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async status(@Request() req) {
    return req.user;
  }
}
