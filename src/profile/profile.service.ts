import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  // Create metodiga userId ni Controllerdan berib yuboramiz
  async create(createProfileDto: CreateProfileDto, userId: number) {
    const profile = this.profileRepository.create({
      ...createProfileDto,
      user: { id: userId },
    });
    return await this.profileRepository.save(profile);
  }

  async findAll() {
    return await this.profileRepository.find({ relations: ['user'] });
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!profile) throw new NotFoundException('Profil topilmadi');
    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    await this.profileRepository.update(id, updateProfileDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const profile = await this.findOne(id);
    return await this.profileRepository.remove(profile);
  }
}
