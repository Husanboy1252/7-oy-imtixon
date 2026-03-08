import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

// Swagger uchun vaqtincha DTO klassi (alohida faylga olsang ham bo'ladi)
class VerifyOtpDto {
  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  code: string;
}

@ApiTags('Auth (Tizimga kirish)')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Ro\'yxatdan o\'tish va OTP yuborish' })
  @ApiResponse({ status: 201, description: 'Emailga kod yuborildi.' })
  async register(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Tizimga kirish (Parol orqali OTP olish)' })
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('verify')
  @ApiOperation({ summary: 'OTP kodni tasdiqlash va Token olish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli kirildi.' })
  async verify(@Body() verifyDto: VerifyOtpDto) {
    // Xatolikni oldini olish uchun body borligini tekshiramiz
    if (!verifyDto || !verifyDto.email || !verifyDto.code) {
      throw new BadRequestException("Email va tasdiqlash kodi yuborilishi shart!");
    }
    
    return await this.authService.verifyOtp(verifyDto.email, verifyDto.code);
  }
}


