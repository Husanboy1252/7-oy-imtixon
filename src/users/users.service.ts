import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Barcha foydalanuvchilarni olish
  async findAll() {
    return await this.userRepository.find();
  }

  // ID bo'yicha topish
  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');
    return user;
  }

  // Email bo'yicha topish (Auth uchun)
async findByEmail(email: string) {
  return await this.userRepository.findOne({
    where: { email },
    // Parolni majburiy olib kelishini ko'rsatamiz
    select: ['id', 'email', 'password', 'role', 'otpCode', 'otpExpires', 'isVerified'] 
  });
}

  // Foydalanuvchini yaratish
  async create(dto: Partial<User>) {
    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  // Ma'lumotlarni yangilash (OTP va Profil uchun)
  async update(id: number, updateDto: Partial<User>) {
    await this.userRepository.update(id, updateDto);
    return this.findOne(id);
  }

  // Foydalanuvchini o'chirish
  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }
}
