import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async validateLogin(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOneByEmail(email);
    if (!user) throw new BadRequestException('Username or password is wrong');

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid)
      throw new BadRequestException('Username or password is wrong');

    return user;
  }

  async validateJwtPayload(payload: JwtPayloadDto): Promise<User> {
    const { sub: userId, email } = payload;

    const user = await this.userRepository.findOneById(userId);

    if (!user) throw new BadRequestException('JWT not valid');
    if (user.email !== email) throw new NotFoundException('JWT not valid');

    return user;
  }

  getAccessToken(user: User): string {
    return this.jwtService.sign({ email: user.email, sub: user.id });
  }
}
