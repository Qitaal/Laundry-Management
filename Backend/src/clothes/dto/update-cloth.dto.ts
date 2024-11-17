import { PartialType } from '@nestjs/mapped-types';
import { CreateClothRequestDto } from './create-cloth.dto';
import { Exclude, Expose, Transform } from 'class-transformer';

export class UpdateClothRequestDto extends PartialType(CreateClothRequestDto) {}
