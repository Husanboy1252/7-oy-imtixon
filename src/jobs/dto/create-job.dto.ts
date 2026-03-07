import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min, IsOptional, MinLength } from 'class-validator';

export class CreateJobDto {
  @ApiProperty({ example: 'Senior Node.js Developer', description: 'Ish o\'rni nomi' })
  @IsString()
  @IsNotEmpty({ message: 'Ish sarlavhasi bo\'sh bo\'lmasligi kerak' })
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'Backend tizimlarni ishlab chiqish va optimallashtirish...' })
  @IsString()
  @IsNotEmpty({ message: 'Ish tavsifi kiritilishi shart' })
  description: string;

  @ApiProperty({ example: 1000, description: 'Minimal oylik miqdori' })
  @IsNumber()
  @Min(0)
  salaryMin: number;

  @ApiProperty({ example: 2500, description: 'Maximal oylik miqdori' })
  @IsNumber()
  @Min(0)
  salaryMax: number;

  @ApiProperty({ example: 2, description: 'Talab qilinadigan ish tajribasi (yil)' })
  @IsNumber()
  @Min(0)
  requiredExperience: number;

  @ApiProperty({ example: 1, description: 'Shahar ID raqami' })
  @IsNumber()
  @IsNotEmpty()
  cityId: number;

  @ApiProperty({ example: 1, description: 'Kategoriya (soha) ID raqami' })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
