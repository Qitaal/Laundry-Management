import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClothDto } from './dto/create-cloth.dto';
import { UpdateClothDto } from './dto/update-cloth.dto';

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Post()
  create(@Body() createClothDto: CreateClothDto) {
    return this.clothesService.create(createClothDto);
  }

  @Get()
  findAll() {
    return this.clothesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clothesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClothDto: UpdateClothDto,
  ) {
    return this.clothesService.update(id, updateClothDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clothesService.remove(id);
  }
}
