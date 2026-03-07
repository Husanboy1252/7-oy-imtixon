import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { City } from './entities/city.entity';
import { Region } from './entities/region.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepo: Repository<Job>,
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
    @InjectRepository(Region)
    private readonly regionRepo: Repository<Region>,
  ) {}

  // 1. Yangi vakansiya yaratish
  async create(employerId: number, dto: CreateJobDto) {
    const job = this.jobRepo.create({
      ...dto,
      employerId,
    });
    return await this.jobRepo.save(job);
  }

  // 2. Barcha vakansiyalarni filtrlash va qidirish (HH.uz mantiqi)
  async findAll(query: any) {
    const { search, cityId, categoryId, minSalary, exp, page = 1, limit = 10 } = query;

    const qb = this.jobRepo.createQueryBuilder('job')
      .leftJoinAndSelect('job.city', 'city')          // Shaharni ulash
      .leftJoinAndSelect('city.region', 'region')     // Shahar orqali Viloyatni ulash
      .leftJoinAndSelect('job.category', 'category')
      .leftJoinAndSelect('job.employer', 'employer');

    // Sarlavha bo'yicha qidiruv
    if (search) {
      qb.andWhere('job.title ILIKE :search', { search: `%${search}%` });
    }

    // Shahar bo'yicha filtr
    if (cityId) {
      qb.andWhere('job.cityId = :cityId', { cityId });
    }

    // Soha (Category) bo'yicha filtr
    if (categoryId) {
      qb.andWhere('job.categoryId = :categoryId', { categoryId });
    }

    // Oylik bo'yicha filtr (Berilgan summadan yuqori bo'lganlar)
    if (minSalary) {
      qb.andWhere('job.salaryMax >= :minSalary', { minSalary });
    }

    // Tajriba bo'yicha filtr (Talab qilingan tajribadan ko'p bo'lmaganlar)
    if (exp) {
      qb.andWhere('job.requiredExperience <= :exp', { exp });
    }

    // Pagination (Sahifalash)
    qb.skip((page - 1) * limit).take(limit);
    qb.orderBy('job.createdAt', 'DESC');

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  // 3. Bitta vakansiyani barcha detallari bilan ko'rish
  async findOne(id: number) {
    const job = await this.jobRepo.createQueryBuilder('job')
      .leftJoinAndSelect('job.city', 'city')
      .leftJoinAndSelect('city.region', 'region')
      .leftJoinAndSelect('job.category', 'category')
      .leftJoinAndSelect('job.employer', 'employer')
      .where('job.id = :id', { id })
      .getOne();

    if (!job) {
      throw new NotFoundException(`Vakansiya #${id} topilmadi`);
    }
    return job;
  }

  // 4. Viloyat va Shaharlarni boshqarish (Admin uchun yordamchi metodlar)
  async createRegion(name: string) {
    const region = this.regionRepo.create({ name });
    return await this.regionRepo.save(region);
  }

  async createCity(name: string, regionId: number) {
    const city = this.cityRepo.create({ name, regionId });
    return await this.cityRepo.save(city);
  }

  async getRegionsWithCities() {
    return await this.regionRepo.find({ relations: ['cities'] });
  }
}
