import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'Eshmatov Toshmat', description: 'To\'liq ism-sharif' })
  @IsString()
  @IsNotEmpty({ message: 'Ism-sharif bo\'sh bo\'lmasligi kerak' })
  fullName: string;

  @ApiProperty({ example: 'user@hh.uz' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRole;
}
