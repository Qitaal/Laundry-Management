import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cloth } from '../entities/cloth.entity';
import { Repository } from 'typeorm';
import { CreateClothRequestDto } from '../dto/create-cloth.dto';
import { User } from 'src/users/entities/user.entity';
import { UpdateClothRequestDto } from '../dto/update-cloth.dto';

@Injectable()
export class ClothRepository {
  constructor(
    @InjectRepository(Cloth)
    private readonly clothRepository: Repository<Cloth>,
  ) {}

  async create(
    createClothDto: CreateClothRequestDto,
    user: User,
  ): Promise<Cloth> {
    const newCLoth = this.clothRepository.create({ user, ...createClothDto });

    return this.clothRepository.save(newCLoth);
  }

  async findOneById(id: string): Promise<Cloth | null> {
    return this.clothRepository.findOne({
      where: { id, isActive: true },
      relations: ['user'],
    });
  }

  async findByFilter(filters: Record<string, any>): Promise<Cloth[]> {
    const query = this.clothRepository.createQueryBuilder('cloth');
    query.leftJoinAndSelect('cloth.user', 'user');

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'name') {
          query.andWhere(`cloth.${key} LIKE :${key}`, { [key]: `%${value}%` });
        } else {
          query.andWhere(`cloth.${key} = :${key}`, { [key]: value });
        }
      }
    });

    return query.getMany();
  }

  async update(
    id: string,
    updateClothDto: UpdateClothRequestDto,
  ): Promise<Cloth> {
    return await this.clothRepository.save({ id, ...updateClothDto });
  }

  async delete(id: string): Promise<Cloth> {
    return await this.clothRepository.save({
      id,
      isActive: false,
      deletedAt: new Date(),
    });
  }
}
