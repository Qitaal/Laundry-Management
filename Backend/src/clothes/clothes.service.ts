import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateClothRequestDto } from './dto/create-cloth.dto';
import { UpdateClothRequestDto } from './dto/update-cloth.dto';
import { Cloth } from './entities/cloth.entity';
import { User } from 'src/users/entities/user.entity';
import { ClothRepository } from './repositories/cloth.repositories';

@Injectable()
export class ClothesService {
  constructor(private readonly clothRepository: ClothRepository) {}

  async create(
    createClothDto: CreateClothRequestDto,
    user: User,
  ): Promise<Cloth> {
    return this.clothRepository.create(createClothDto, user);
  }

  async findAll(user: User): Promise<Cloth[]> {
    return this.clothRepository.findByFilter({
      user: user.id,
      isActive: true,
    });
  }

  async findOne(id: string, user: User): Promise<Cloth> {
    await this.validateClothOwnership(id, user);

    return this.clothRepository.findOneById(id);
  }

  async update(
    id: string,
    updateClothDto: UpdateClothRequestDto,
    user: User,
  ): Promise<Cloth> {
    await this.validateClothOwnership(id, user);

    return this.clothRepository.update(id, updateClothDto);
  }

  async remove(id: string, user: User): Promise<Cloth> {
    await this.validateClothOwnership(id, user);

    return this.clothRepository.delete(id);
  }

  private async validateClothOwnership(id: string, user: User): Promise<void> {
    const cloth = await this.clothRepository.findOneById(id);

    if (!cloth) throw new NotFoundException('cloth not found');

    if (cloth.user.id !== user.id)
      throw new UnauthorizedException('Unauthorized access');
  }
}
