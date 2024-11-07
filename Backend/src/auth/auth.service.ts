import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateLogin(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;

    const user = await this.userService.findOne({ email: email });
    if (!user) throw new BadRequestException('Email or password is wrong');

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid)
      throw new BadRequestException('Email or password is wrong');

    return user;
  }

  async validateJwtPayload(payload: JwtPayloadDto) {
    const { sub: userId, email } = payload;

    const user = await this.userService.findOne({ id: userId });
    if (!user) throw new BadRequestException('JTW not valid');
    if (user.email !== email) throw new NotFoundException('JWT not valid');

    return user;
  }

  async getAccessToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
