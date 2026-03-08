import { Injectable, UnauthorizedException, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/create-auth.dto';
import { MailService } from '../mail/mail.service'; // src emas nisbiy yo'l ishlatildi
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  // 1. RO'YXATDAN O'TISH (REGISTER)
  async register(dto: CreateUserDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Bu email allaqachon mavjud');
    }

    // Parolni hash qilish
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    // Userni bazaga saqlash
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    // Ro'yxatdan o'tgandan so'ng OTP yuborish
    return this.generateOtp(user.email);
  }

  // 2. LOGIN (PAROLNI TEKSHIRIB KOD YUBORISH)
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    
    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Parol xato');
    }

    return this.generateOtp(user.email);
  }

  // 3. OTP GENERATSIYA VA YUBORISH (user is possibly null xatosi tuzatildi)
  async generateOtp(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60000); // 5 daqiqa

    // Bazadagi userning OTP ma'lumotlarini yangilash
    await this.usersService.update(user.id, {
      otpCode: otp,
      otpExpires: expires,
    });

    // Emailga kodni yuborish
    await this.mailService.sendOtpEmail(email, otp);
    
    return { 
      message: "6 xonali tasdiqlash kodi emailga yuborildi!",
      email: email 
    };
  }

  // 4. OTP TASDIQLASH (VERIFY)
  async verifyOtp(email: string, code: string) {
    const user = await this.usersService.findByEmail(email);

    // Xavfsiz tekshiruv (null va vaqt uchun)
    if (!user || user.otpCode !== code || !user.otpExpires || user.otpExpires < new Date()) {
      throw new BadRequestException("Kod noto'g'ri yoki muddati o'tgan");
    }

    // Tasdiqlanganidan so'ng kodni bazadan o'chirish
    await this.usersService.update(user.id, {
      otpCode: null,
      otpExpires: null,
      isVerified: true
    });

    // JWT Token qaytarish
    return this.generateToken(user);
  }

  // 5. JWT TOKEN YARATISH
  private async generateToken(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
