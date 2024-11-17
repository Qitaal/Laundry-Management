import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Request,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClothRequestDto } from './dto/create-cloth.dto';
import { UpdateClothRequestDto } from './dto/update-cloth.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { Cloth } from './entities/cloth.entity';

@Controller('clothes')
@UseGuards(JwtAuthGuard)
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createClothDto: CreateClothRequestDto, @Request() req) {
    const user: User = req.user;

    const cloth = await this.clothesService.create(createClothDto, user);

    return plainToInstance(Cloth, cloth);
  }

  @Get()
  @HttpCode(200)
  async findAll(@Request() req) {
    const user: User = req.user;

    const clothes = await this.clothesService.findAll(user);

    return plainToInstance(Cloth, clothes);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const user = req.user;

    const cloth = this.clothesService.findOne(id, user);

    return plainToInstance(Cloth, cloth);
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClothDto: UpdateClothRequestDto,
    @Request() req,
  ) {
    const user: User = req.user;

    const cloth = await this.clothesService.update(id, updateClothDto, user);

    return plainToInstance(Cloth, cloth);
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const user: User = req.user;

    const cloth = await this.clothesService.remove(id, user);

    return plainToInstance(Cloth, cloth);
  }
}
