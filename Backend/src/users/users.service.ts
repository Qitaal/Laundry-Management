import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.userRepository.isEmailExist(createUserDto.email)) {
      throw new ConflictException('Email already exists');
    }

    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOne(
    options: Partial<{ id?: string; email?: string }>,
  ): Promise<User> {
    const user = options.id
      ? await this.userRepository.findOneById(options.id)
      : await this.userRepository.findOneByEmail(options.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.validateIdExist(id);

    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    await this.validateIdExist(id);

    return await this.userRepository.delete(id);
  }

  private async validateIdExist(id: string): Promise<void> {
    if (!(await this.userRepository.isIdExist(id))) {
      throw new NotFoundException('User not found');
    }
  }
}
