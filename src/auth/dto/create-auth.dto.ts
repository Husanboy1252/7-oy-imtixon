import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@hh.uz' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;
}

// src/auth/dto/create-auth.dto.ts ichiga qo'shing


export class VerifyOtpDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Foydalanuvchi emaili' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456', description: '6 xonali tasdiqlash kodi' })
  @IsString()
  @Length(6, 6)
  code: string;
}
