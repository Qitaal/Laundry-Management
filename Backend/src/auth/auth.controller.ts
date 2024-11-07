import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
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
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  async login(@Request() req) {
    const user: User = req.user;

    if (!user) throw new NotFoundException('User not found');

    return await this.authService.getAccessToken(user);
  }

  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    if (await this.usersService.emailExist(registerUserDto.email)) {
      throw new ConflictException('Email already in use');
    }

    return this.usersService.create(registerUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async status(@Request() req) {
    return req.user;
  }
}
