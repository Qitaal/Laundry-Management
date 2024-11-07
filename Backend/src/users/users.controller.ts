import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(@Query('id') id: string, @Query('email') email: string) {
    const filter: any = {};

    if (id) filter.id = id;
    if (email) filter.email = email;

    if (Object.keys(filter).length === 0) {
      return this.usersService.findAll();
    }

    const user = await this.usersService.findOne(filter);

    if (!user) throw new NotFoundException('Not Found');

    delete user.password;

    return user;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    if (!this.usersService.idExist(id)) {
      throw new NotFoundException('Id not exist');
    }

    await this.usersService.update(id, updateUserDto);

    const user = await this.usersService.findOne({ id: id });

    delete user.password;

    return user;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    if (!(await this.usersService.idExist(id))) {
      throw new NotFoundException('Id not exist');
    }

    return await this.usersService.remove(id);
  }
}
