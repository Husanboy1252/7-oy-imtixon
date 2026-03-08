import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam,  } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Guardingiz bo'lsa qo'shing

@ApiTags('Users (Foydalanuvchilar)')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni ko\'rish (Admin uchun)' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo\'yicha foydalanuvchini topish' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID raqami' })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard) // Faqat login qilganlar o'zgartira olsin
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Foydalanuvchi ma\'lumotlarini yangilash' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Foydalanuvchini o\'chirish' })
  async remove(@Param('id') id: string) {
    return  this.usersService.remove(+id);
  }
}
