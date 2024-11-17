import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);

    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findActiveUsers(): Promise<User[]> {
    return await this.userRepository.findBy({ isActive: true });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async findOneById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async isEmailExist(email: string): Promise<boolean> {
    return await this.userRepository.existsBy({ email: email });
  }

  async isIdExist(id: string): Promise<boolean> {
    return await this.userRepository.existsBy({ id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.save({ id: id, ...updateUserDto });
  }

  async delete(id: string): Promise<User> {
    return await this.userRepository.save({
      id: id,
      isActive: false,
      deletedAt: new Date(),
    });
  }
}
