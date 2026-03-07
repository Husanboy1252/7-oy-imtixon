import { 
  Controller, Get, Post, Body,  Param, Delete, 
  Query, UseGuards, Request 
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
// import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Jobs (Vakansiyalar va Hududlar)')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // --- VAKANSIYALAR BILAN ISHLASH ---

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.EMPLOYER, UserRole.ADMIN) // Faqat ish beruvchi yoki admin
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi vakansiya e\'lon qilish' })
  async create(@Body() createJobDto: CreateJobDto, @Request() req) {
    return await this.jobsService.create(req.user.id, createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha vakansiyalarni qidirish va filtrlash' })
  @ApiQuery({ name: 'search', required: false, description: 'Ish nomi bo\'yicha qidirish' })
  @ApiQuery({ name: 'cityId', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'minSalary', required: false })
  @ApiQuery({ name: 'exp', required: false, description: 'Maksimal tajriba yili' })
  async findAll(@Query() query: any) {
    return await this.jobsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Vakansiyani batafsil ko\'rish (ID orqali)' })
  async findOne(@Param('id') id: string) {
    return await this.jobsService.findOne(+id);
  }

  // --- HUDUDLARNI BOSHQARISH (ADMIN UCHUN) ---

  @Post('regions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi viloyat yaratish (Faqat Admin)' })
  async createRegion(@Body('name') name: string) {
    return await this.jobsService.createRegion(name);
  }

  @Post('cities')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Yangi shahar yaratish (Faqat Admin)' })
  async createCity(@Body('name') name: string, @Body('regionId') regionId: number) {
    return await this.jobsService.createCity(name, regionId);
  }

  @Get('locations/all')
  @ApiOperation({ summary: 'Barcha viloyatlar va shaharlar ierarxiyasini olish' })
  async getLocations() {
    return await this.jobsService.getRegionsWithCities();
  }
}
