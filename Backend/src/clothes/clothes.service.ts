import { Injectable } from '@nestjs/common';
import { CreateClothDto } from './dto/create-cloth.dto';
import { UpdateClothDto } from './dto/update-cloth.dto';

@Injectable()
export class ClothesService {
  create(createClothDto: CreateClothDto) {
    return createClothDto;
  }

  findAll() {
    return `This action returns all clothes`;
  }

  findOne(id: string) {
    return `This action returns a ${id} cloth`;
  }

  update(id: string, updateClothDto: UpdateClothDto) {
    return updateClothDto;
  }

  remove(id: string) {
    return `This action removes a #${id} cloth`;
  }
}
