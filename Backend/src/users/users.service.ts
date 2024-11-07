import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, Timestamp } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = hashSync(createUserDto.password, 12);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser).catch((error) => {
      throw new InternalServerErrorException('Create fail');
    });
    delete newUser.password;
    return newUser;
  }

  async findAll() {
    const users = await this.userRepository
      .createQueryBuilder()
      .select(['id', 'name', 'email'])
      .where({ isActive: true })
      .execute()
      .catch((error) => {
        throw new InternalServerErrorException('Fetch fail');
      });
    return users;
  }

  async findOne(filter: any): Promise<User> {
    return await this.userRepository
      .findOne({ where: { ...filter, isActive: true } })
      .catch((error) => {
        throw new InternalServerErrorException('Fetch fail');
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository
      .update(id, updateUserDto)
      .catch((error) => {
        throw new InternalServerErrorException('Update fail');
      });
  }

  async remove(id: string) {
    return await this.userRepository
      .update(id, {
        isActive: false,
        deletedAt: new Date(),
      })
      .catch((error) => {
        throw new InternalServerErrorException('Delete fail');
      });
  }

  async emailExist(email: string) {
    return await this.userRepository.existsBy({ email }).catch((error) => {
      throw new InternalServerErrorException('Fetch fail');
    });
  }

  async idExist(id: string) {
    return await this.userRepository.existsBy({ id }).catch((error) => {
      throw new InternalServerErrorException('Fetch fail');
    });
  }
}
